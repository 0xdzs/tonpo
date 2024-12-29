interface TokenData {
  id: string;
  type: string;
}

interface DexData {
  id: string;
  type: string;
}

interface Transactions {
  buys: number;
  sells: number;
  buyers: number;
  sellers: number;
}

interface PoolAttributes {
  base_token_price_usd: string;
  quote_token_price_usd: string;
  name: string;
  pool_created_at: string;
  base_token_address: string;
  volume_usd: {
    m5: string;
    h1: string;
    h6: string;
    h24: string;
  };
  transactions: {
    m5: Transactions;
    h15: Transactions;
    h1: Transactions;
    h24: Transactions;
  };
  reserve_in_usd: string;
  fdv_usd: string;
  combined_volume_usd?: {
    h24: string;
  };
}

export interface Pool {
  id: string;
  type: string;
  attributes: PoolAttributes;
  relationships: {
    base_token: { data: TokenData };
    quote_token: { data: TokenData };
    dex: { data: DexData };
  };
}

export interface CombinedPool extends Omit<Pool, 'attributes'> {
  attributes: Pool['attributes'] & {
    combined_volume_usd: {
      h24: string;
    };
    fee_tiers: string[];
  };
} 