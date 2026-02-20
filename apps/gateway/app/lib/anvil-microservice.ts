export interface AnvilBootstrapPayload {
  rpcUrl: string;
  chainId: number;
  contracts: Record<string, string>;
}

const withSlash = (value: string): string => (value.endsWith("/") ? value.slice(0, -1) : value);

export const bootstrapAnvilMicroservice = async (
  baseUrl: string,
  signal?: AbortSignal
): Promise<AnvilBootstrapPayload> => {
  const res = await fetch(`${withSlash(baseUrl)}/adi/bootstrap`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Anvil service bootstrap failed (${res.status})`);
  }

  const body = await res.json();
  if (!body?.ok || !body?.data) {
    throw new Error("Invalid response from anvil microservice");
  }

  return body.data as AnvilBootstrapPayload;
};
