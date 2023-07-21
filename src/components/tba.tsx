'use client'
import { useWalletClient } from 'wagmi'
import { TokenboundClient } from '@tokenbound/sdk'
import { type TBAccountParams } from "@tokenbound/sdk/dist/src/TokenboundClient";
import { useState } from 'react';

const DEFAULT_ACCOUNT: TBAccountParams = {
  tokenContract: "0xe7134a029cd2fd55f678d6809e64d0b6a0caddcb",
  tokenId: "9"
}

export default function TBA() {
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const tokenboundClient = new TokenboundClient({ signer: walletClient, chainId: 5 })
	const [retrievedAccount, setRetrievedAccount] = useState<string>("");
  const [TBAccount, setTBAccount] = useState<TBAccountParams>(DEFAULT_ACCOUNT)
  const getAccount = () => {
    try {
      const account = tokenboundClient.getAccount(TBAccount)
      setRetrievedAccount(account);
    } catch(err) {
      console.log(err);
    }
  }
  const resetAccount = () => {
    setRetrievedAccount("");
    setTBAccount(DEFAULT_ACCOUNT);
  }
  return (
    <main className="...">
      <div className="...">
        <div className="...">


        <form onSubmit={(e) => {
			  e.preventDefault();
			  getAccount();
			}}
			className="grid md:grid-cols-2 grid-cols-1 gap-4">

			<label htmlFor="nftContract">
		    NFT Contract
		  </label>
		  <input
					type="text"
					className="h-fit p-2 rounded-lg bg-slate-300 text-black"
					id="nftContract"
					onChange={(event) => setTBAccount({
										...TBAccount,
										tokenContract: event.target.value as TBAccountParams["tokenContract"]
					})}
					value={TBAccount.tokenContract}
			/>

		  <label htmlFor="nftTokenId">
		    Token ID
		  </label>


		  <input
					type="text"
					className="h-fit p-2 rounded-lg bg-slate-300 text-black"
					id="nftTokenId"
					onChange={(event) => setTBAccount({
									...TBAccount,
									tokenId: event.target.value
					})}
					value={TBAccount.tokenId}
			/>

		  <button
					type="submit"
					className="h-fit p-2 bg-slate-100 rounded-lg col-span-2 text-black self-end">
				Check
			</button>

		</form>

				</div>
        <div className="...">

    <pre className="w-full overflow-x-auto">
      {JSON.stringify({...TBAccount, retrievedAccount}, null, 2)}
    </pre>

    <button type="button" className="p-2 bg-slate-100 rounded-lg text-black" onClick={resetAccount}>
      Reset
    </button>

</div>
			</div>
		</main>
  )
}