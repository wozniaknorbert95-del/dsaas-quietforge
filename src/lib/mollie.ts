/**
 * Mollie API Client for Node.js
 * 
 * Provides typed access to Mollie Payments API for:
 * - Creating payments (checkout, deposits, prepayments)
 * - Webhook handling for payment status updates
 * - Refunds and cancellations
 * 
 * Environment variables required:
 * - MOLLIE_API_KEY: Live or test API key from Mollie Dashboard
 * - MOLLIE_WEBHOOK_SECRET: Secret for verifying webhook signatures
 */

import { createHash, timingSafeEqual } from 'crypto';

// Types for Mollie API responses
export interface MolliePayment {
  id: string;
  mode: 'live' | 'test';
  status: 'open' | 'pending' | 'authorized' | 'paid' | 'canceled' | 'failed' | 'expired' | 'refunded';
  amount: { value: string; currency: 'EUR' };
  description: string;
  method?: string;
  metadata?: Record<string, string>;
  locale?: string;
  profileId: string;
  customerId?: string;
  sequenceType?: 'oneoff' | 'first' | 'recurring';
  redirectUrl: string;
  webhookUrl?: string;
  createdAt: string;
  paidAt?: string;
  canceledAt?: string;
  expiresAt?: string;
  _links: {
    self: { href: string; type: string };
    checkout?: { href: string; type: string };
    dashboard: { href: string; type: string };
  };
}

export interface CreatePaymentParams {
  amount: { value: string; currency: 'EUR' };
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  metadata?: Record<string, string>;
  locale?: string;
  method?: string[];
  sequenceType?: 'oneoff' | 'first' | 'recurring';
}

export interface MollieWebhookPayload {
  id: string;
  resource: 'payment' | 'refund' | 'chargeback' | 'subscription' | 'customer' | 'mandate';
  event: string;
  createdAt: string;
}

export interface QuietforgePaymentContext {
  proposalId: string;
  clientId: 'flexgrafik' | 'quietforge';
  amount: number; // in euros
  description: string;
  returnUrl: string;
  webhookUrl: string;
  metadata: {
    proposal_id: string;
    client_id: string;
    agent: string;
    channel: string;
    product: string;
  };
}

class MollieClient {
  private apiKey: string;
  private webhookSecret: string;
  private baseUrl = 'https://api.mollie.com/v2';

  constructor() {
    this.apiKey = process.env.MOLLIE_API_KEY || '';
    this.webhookSecret = process.env.MOLLIE_WEBHOOK_SECRET || '';
    
    if (!this.apiKey) {
      console.warn('[MollieClient] MOLLIE_API_KEY not set - payments will fail');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mollie API error ${response.status}: ${errorText}`);
    }

    return response.json();
  }

  /**
   * Create a payment for Automation Map booking or Wizard Cash Engine deposit
   */
  async createPayment(params: CreatePaymentParams): Promise<MolliePayment> {
    return this.request<MolliePayment>('/payments', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  /**
   * Get payment details by ID
   */
  async getPayment(paymentId: string): Promise<MolliePayment> {
    return this.request<MolliePayment>(`/payments/${paymentId}`);
  }

  /**
   * Cancel a payment
   */
  async cancelPayment(paymentId: string): Promise<MolliePayment> {
    return this.request<MolliePayment>(`/payments/${paymentId}/cancel`, {
      method: 'POST'
    });
  }

  /**
   * Create a Quietforge-specific payment (Automation Map / Wizard deposit)
   */
  async createQuietforgePayment(context: QuietforgePaymentContext): Promise<MolliePayment> {
    const amountValue = context.amount.toFixed(2);
    
    return this.createPayment({
      amount: { value: amountValue, currency: 'EUR' },
      description: context.description,
      redirectUrl: context.returnUrl,
      webhookUrl: context.webhookUrl,
      locale: 'nl_NL',
      metadata: context.metadata,
      method: ['ideal', 'creditcard', 'banktransfer', 'paypal', 'applepay'],
      sequenceType: 'oneoff'
    });
  }

  /**
   * Verify webhook signature for security
   * Mollie sends the signature in the 'Mollie-Signature' header
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      console.warn('[MollieClient] Webhook secret not configured - skipping verification');
      return true; // Allow in development
    }

    try {
      const expectedSignature = createHash('sha256')
        .update(this.webhookSecret + payload)
        .digest('hex');
      
      // Timing-safe comparison
      return timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );
    } catch {
      return false;
    }
  }

  /**
   * Parse and verify incoming webhook
   */
  async handleWebhook(request: Request): Promise<{ payment: MolliePayment; event: string } | null> {
    const payload = await request.text();
    const signature = request.headers.get('mollie-signature') || '';
    
    if (!this.verifyWebhookSignature(payload, signature)) {
      console.error('[MollieClient] Invalid webhook signature');
      return null;
    }

    const webhookData: MollieWebhookPayload = JSON.parse(payload);
    
    if (webhookData.resource === 'payment') {
      const payment = await this.getPayment(webhookData.id);
      return { payment, event: webhookData.event };
    }

    return null;
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.startsWith('live_') || this.apiKey.startsWith('test_'));
  }
}

// Singleton instance
export const mollieClient = new MollieClient();

// Helper for creating Automation Map €290 payment
export async function createAutomationMapPayment(
  proposalId: string,
  clientId: 'flexgrafik' | 'quietforge',
  returnUrl: string,
  webhookUrl: string
): Promise<MolliePayment> {
  return mollieClient.createQuietforgePayment({
    proposalId,
    clientId,
    amount: 290,
    description: `Quietforge Automation Map - Strategic Discovery Session (€290 credited toward build)`,
    returnUrl,
    webhookUrl,
    metadata: {
      proposal_id: proposalId,
      client_id: clientId,
      agent: 'DemandTrust',
      channel: 'book-discovery',
      product: 'automation-map'
    }
  });
}

// Helper for creating Wizard Cash Engine deposit
export async function createWizardDepositPayment(
  proposalId: string,
  clientId: 'flexgrafik' | 'quietforge',
  amount: number, // project-specific amount
  returnUrl: string,
  webhookUrl: string,
  metadata?: Record<string, string>
): Promise<MolliePayment> {
  return mollieClient.createQuietforgePayment({
    proposalId,
    clientId,
    amount,
    description: `Wizard Cash Engine - Project Deposit (€${amount})`,
    returnUrl,
    webhookUrl,
    metadata: {
      proposal_id: proposalId,
      client_id: clientId,
      agent: 'ConversionRetention',
      channel: 'wizard-checkout',
      product: 'wizard-cash-engine',
      ...metadata
    }
  });
}