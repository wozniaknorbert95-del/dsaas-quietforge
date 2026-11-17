'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { ROUTES } from '@/lib/constants';
import {
  DEMO_COUPONS,
  DEMO_EXTRAS,
  DEMO_MIN_ORDER,
  DEMO_PRODUCTS,
  computeDemoPrice,
  demoOrderRef,
} from '@/lib/demo/wizard-catalog';

type WizardStep = 'product' | 'options' | 'extras' | 'checkout' | 'done';

const STEP_ORDER: readonly WizardStep[] = ['product', 'options', 'extras', 'checkout', 'done'];

const STEP_TITLES: Record<WizardStep, string> = {
  product: 'Choose your product',
  options: 'Configure it',
  extras: 'Finishing touches',
  checkout: 'Review and order',
  done: 'Order received',
};

const COUPON_KEY = 'qf-demo-coupon';

/** Reward coupon from the game demo — browser store, read after hydration. */
function subscribeCoupon(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

function getCouponSnapshot(): string | null {
  const saved = window.sessionStorage.getItem(COUPON_KEY);
  return saved && DEMO_COUPONS[saved] !== undefined ? saved : null;
}

interface FormErrors {
  name?: string;
  email?: string;
}

/**
 * Live Wizard demo — full front-end logic, no backend.
 * Everything stops safely at "Place order" with a demo message.
 */
export default function WizardDemo() {
  const [step, setStep] = useState<WizardStep>('product');
  const [productId, setProductId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [extras, setExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const coupon = useSyncExternalStore(subscribeCoupon, getCouponSnapshot, () => null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const product = useMemo(
    () => DEMO_PRODUCTS.find((item) => item.id === productId) ?? null,
    [productId]
  );

  const price = useMemo(() => {
    if (!product) return null;
    return computeDemoPrice(product, selections, extras, quantity, coupon);
  }, [product, selections, extras, quantity, coupon]);

  useEffect(() => {
    trackEvent('wizard_demo_click', { location: 'lab_wizard_demo' });
  }, []);

  const stepIndex = STEP_ORDER.indexOf(step);

  function goNext(): void {
    if (step === 'checkout') {
      submitOrder();
      return;
    }
    setStep(STEP_ORDER[Math.min(stepIndex + 1, 3)]);
  }

  function goBack(): void {
    setStep(STEP_ORDER[Math.max(stepIndex - 1, 0)]);
  }

  function selectProduct(id: string): void {
    setProductId(id);
    setSelections({});
  }

  function toggleChoice(groupId: string, choiceId: string, mode: 'single' | 'multi'): void {
    setSelections((prev) => {
      const current = prev[groupId] ?? [];
      if (mode === 'single') return { ...prev, [groupId]: [choiceId] };
      return {
        ...prev,
        [groupId]: current.includes(choiceId)
          ? current.filter((item) => item !== choiceId)
          : [...current, choiceId],
      };
    });
  }

  function toggleExtra(id: string): void {
    setExtras((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function submitOrder(): void {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Please enter a valid email.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setOrderRef(demoOrderRef());
    setStep('done');
    trackEvent('wizard_demo_click', { location: 'lab_wizard_demo_order' });
  }

  function resetDemo(): void {
    setStep('product');
    setProductId(null);
    setSelections({});
    setExtras([]);
    setQuantity(1);
    setName('');
    setEmail('');
    setCompany('');
    setErrors({});
    setOrderRef(null);
  }

  const canContinue =
    (step === 'product' && productId !== null) ||
    step === 'options' ||
    step === 'extras' ||
    step === 'checkout';

  return (
    <div className="qf-wiz">
      <div className="qf-wiz-panel">
        <header className="qf-wiz-head">
          <p className="qf-wiz-step-label">
            Step {Math.min(stepIndex + 1, 4)} of 4 · {STEP_TITLES[step]}
          </p>
          <div className="qf-wiz-progress" aria-hidden="true">
            <span data-progress={Math.min(stepIndex, 4)} />
          </div>
        </header>

        {step === 'product' ? (
          <ul className="qf-wiz-options qf-wiz-options--cards">
            {DEMO_PRODUCTS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="qf-wiz-choice"
                  data-selected={item.id === productId}
                  aria-pressed={item.id === productId}
                  onClick={() => selectProduct(item.id)}
                >
                  <span>
                    <strong>{item.name}</strong>
                    <span className="qf-wiz-choice-tag">{item.tagline}</span>
                  </span>
                  <span className="qf-wiz-choice-price">
                    from €{item.basePrice}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {step === 'options' && product ? (
          <>
            {product.options.map((group) => (
              <div key={group.id}>
                <p className="qf-wiz-group-label">
                  {group.label}
                  {group.hint ? <span className="qf-wiz-hint"> · {group.hint}</span> : null}
                </p>
                <ul className="qf-wiz-options">
                  {group.choices.map((choice) => {
                    const selected = (selections[group.id] ?? []).includes(choice.id);
                    return (
                      <li key={choice.id}>
                        <button
                          type="button"
                          className="qf-wiz-choice"
                          data-selected={selected}
                          aria-pressed={selected}
                          onClick={() => toggleChoice(group.id, choice.id, group.mode)}
                        >
                          <span>{choice.label}</span>
                          <span className="qf-wiz-choice-price">
                            {choice.price === 0 ? 'included' : `+ €${choice.price}`}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {product.perUnit ? (
              <div className="qf-wiz-qty">
                <span className="qf-wiz-group-label">Quantity</span>
                <button
                  type="button"
                  className="qf-btn-ghost"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qf-wiz-qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qf-btn-ghost"
                  onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <span className="qf-wiz-hint">{product.unit}</span>
              </div>
            ) : null}
          </>
        ) : null}

        {step === 'extras' ? (
          <ul className="qf-wiz-options">
            {DEMO_EXTRAS.map((extra) => {
              const selected = extras.includes(extra.id);
              return (
                <li key={extra.id}>
                  <button
                    type="button"
                    className="qf-wiz-choice"
                    data-selected={selected}
                    aria-pressed={selected}
                    onClick={() => toggleExtra(extra.id)}
                  >
                    <span>
                      {extra.label}
                      {extra.note ? <span className="qf-wiz-hint"> · {extra.note}</span> : null}
                    </span>
                    <span className="qf-wiz-choice-price">
                      {extra.price === 0 ? '—' : `+ €${extra.price}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        {step === 'checkout' ? (
          <div className="qf-wiz-form">
            <label className="qf-wiz-label" htmlFor="wiz-name">
              Name
            </label>
            <input
              id="wiz-name"
              className="qf-wiz-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
            {errors.name ? <p className="qf-wiz-error">{errors.name}</p> : null}
            <label className="qf-wiz-label" htmlFor="wiz-email">
              Email
            </label>
            <input
              id="wiz-email"
              className="qf-wiz-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              inputMode="email"
            />
            {errors.email ? <p className="qf-wiz-error">{errors.email}</p> : null}
            <label className="qf-wiz-label" htmlFor="wiz-company">
              Company <span className="qf-wiz-hint">(optional)</span>
            </label>
            <input
              id="wiz-company"
              className="qf-wiz-input"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
            />
            <p className="qf-wiz-note">
              Demo — nothing is sent. The company behind this demo is offline, so your order stops
              safely here.
            </p>
          </div>
        ) : null}

        {step === 'done' ? (
          <div className="qf-wiz-success">
            <p className="qf-wiz-success-chip">DEMO · ORDER NOT SENT</p>
            <h3 className="qf-approach-card-title">Order received — demo mode</h3>
            <p className="qf-approach-card-body">
              Reference <strong>{orderRef}</strong>. In the live system this is where the
              confirmation email and production would start. Nothing left your browser.
            </p>
            <div className="qf-wiz-nav">
              <button type="button" className="qf-btn-ghost" onClick={resetDemo}>
                Start again
              </button>
              <Link href={ROUTES.bookAScan} className="qf-btn-fill">
                Book a scan →
              </Link>
            </div>
          </div>
        ) : null}

        {step !== 'done' ? (
          <nav className="qf-wiz-nav" aria-label="Demo steps">
            {stepIndex > 0 ? (
              <button type="button" className="qf-btn-ghost" onClick={goBack}>
                ← Back
              </button>
            ) : null}
            <button type="button" className="qf-btn-fill" onClick={goNext} disabled={!canContinue}>
              {step === 'checkout' ? 'Place order — demo' : 'Continue →'}
            </button>
          </nav>
        ) : null}
      </div>

      <aside className="qf-wiz-panel qf-wiz-summary" aria-label="Price summary">
        <p className="qf-wiz-step-label">Your quote</p>
        {product && price ? (
          <>
            <p className="qf-wiz-summary-product">
              {product.name}
              {product.perUnit ? ` × ${quantity}` : ''}
            </p>
            <div className="qf-wiz-row">
              <span>Base</span>
              <span>€{price.base}</span>
            </div>
            <div className="qf-wiz-row">
              <span>Options</span>
              <span>€{price.options}</span>
            </div>
            <div className="qf-wiz-row">
              <span>Extras</span>
              <span>€{price.extras + price.express}</span>
            </div>
            {price.discount > 0 ? (
              <div className="qf-wiz-row">
                <span>Reward {coupon}</span>
                <span>− €{price.discount}</span>
              </div>
            ) : null}
            <div className="qf-wiz-row qf-wiz-row--total">
              <span>Total</span>
              <span>€{price.total}</span>
            </div>
            {price.clampedToMinimum ? (
              <p className="qf-wiz-note">Minimum order €{DEMO_MIN_ORDER} applied.</p>
            ) : null}
            {coupon ? (
              <p className="qf-wiz-coupon">
                Reward {coupon} · −{DEMO_COUPONS[coupon]}% applied
              </p>
            ) : null}
            <p className="qf-wiz-note">Demo pricing — illustrative, not an offer.</p>
          </>
        ) : (
          <p className="qf-wiz-note">Pick a product and the quote builds itself as you go.</p>
        )}
      </aside>
    </div>
  );
}
