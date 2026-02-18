import {
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TokenId,
    CustomFractionalFee,
    FeeAssessmentMethod,
} from "@hashgraph/sdk";
import { createClient, getOperatorId, getOperatorKey, getOperatorPublicKey } from "../config";
import { waitForPropagation } from "../utils/network-check";
import type { TokenCreateResult, TokenMintResult } from "./types";
import { getRewardForSequence } from "./types";

const DECIMALS = 6;
const UNIT = 10 ** DECIMALS;

export async function createCCCToken(): Promise<TokenCreateResult> {
    const client = createClient();
    const operatorId = getOperatorId();
    const operatorKey = getOperatorKey();

    const fractionalFee = new CustomFractionalFee()
        .setNumerator(2)
        .setDenominator(100)
        .setFeeCollectorAccountId(operatorId)
        .setAssessmentMethod(FeeAssessmentMethod.Inclusive);

    const tx = await new TokenCreateTransaction()
        .setTokenName("CCC Contribution Token")
        .setTokenSymbol("CCC")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(DECIMALS)
        .setInitialSupply(0)
        .setSupplyType(TokenSupplyType.Infinite)
        .setTreasuryAccountId(operatorId)
        .setSupplyKey(operatorKey.publicKey)
        .setFreezeKey(operatorKey.publicKey)
        .setWipeKey(operatorKey.publicKey)
        .setPauseKey(operatorKey.publicKey)
        .setAdminKey(operatorKey.publicKey)
        .setCustomFees([fractionalFee])
        .setTokenMemo("$CCC — FedArch Contribution Token | team weown | ETHDenver 2026")
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);

    await waitForPropagation(3000);

    client.close();

    return {
        tokenId: receipt.tokenId!.toString(),
        transactionId: response.transactionId.toString(),
    };
}

export async function mintCCCReward(
    tokenId: string,
    cccId: string,
    sequence: number
): Promise<TokenMintResult> {
    const client = createClient();
    const operatorKey = getOperatorKey();

    const reward = getRewardForSequence(sequence);
    const amount = reward * UNIT;

    const tx = await new TokenMintTransaction()
        .setTokenId(TokenId.fromString(tokenId))
        .setAmount(amount)
        .freezeWith(client)
        .sign(operatorKey);

    const response = await tx.execute(client);
    await response.getReceipt(client);

    client.close();

    return {
        amount: reward,
        transactionId: response.transactionId.toString(),
    };
}
