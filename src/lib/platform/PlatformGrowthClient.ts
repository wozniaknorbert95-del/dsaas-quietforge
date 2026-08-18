export type PlatformConnectionStatus = 'connected' | 'unavailable' | 'error';

export interface PlatformAgentProjection {
  id: string;
  name: string;
  role: string;
  score: number | null;
  status: string;
}

export interface PlatformProposalProjection {
  id: string;
  agent: string;
  channel: string;
  status: string;
  summary: string;
}

export interface PlatformGrowthSnapshot {
  connection: PlatformConnectionStatus;
  platformRelease: string;
  tenantId: 'quietforge';
  agents: PlatformAgentProjection[];
  proposals: PlatformProposalProjection[];
  message?: string;
}

const EMPTY_SNAPSHOT: PlatformGrowthSnapshot = {
  connection: 'unavailable',
  platformRelease: 'kanon/0.3.0',
  tenantId: 'quietforge',
  agents: [],
  proposals: [],
  message: 'Platform runtime is not connected in this environment.',
};

export async function loadQuietForgeGrowthSnapshot(): Promise<PlatformGrowthSnapshot> {
  const platformUrl = process.env.NEXT_PUBLIC_DSAAS_PLATFORM_URL?.replace(/\/$/, '');
  if (!platformUrl) {
    return EMPTY_SNAPSHOT;
  }

  try {
    const response = await fetch(
      `${platformUrl}/api/v1/tenants/quietforge/growth-os`,
      { cache: 'no-store' },
    );
    if (!response.ok) {
      return {
        ...EMPTY_SNAPSHOT,
        connection: 'error',
        message: `Platform returned HTTP ${response.status}.`,
      };
    }

    const snapshot = (await response.json()) as PlatformGrowthSnapshot;
    if (snapshot.tenantId !== 'quietforge') {
      return {
        ...EMPTY_SNAPSHOT,
        connection: 'error',
        message: 'Platform returned a projection for a different tenant.',
      };
    }
    return { ...snapshot, connection: 'connected' };
  } catch {
    return {
      ...EMPTY_SNAPSHOT,
      connection: 'error',
      message: 'Platform connection failed. No action was executed.',
    };
  }
}
