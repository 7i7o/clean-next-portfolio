import { useProvider, useSigner, useContract } from "wagmi";
import contractABI from "../constants/contractABI.json";
import contractNameOrAddress from "../constants/contract"

const useSVGieContract = () => {

    const [signer] = useSigner();
    const provider = useProvider();

    const contract = useContract({
        addressOrName: contractNameOrAddress,
        contractInterface: contractABI,
        signerOrProvider: signer.data || provider,
    });

    const getPrice = async () => {
        contract.getPrice().then( val => val )
    }

    const getNextPrice = async () => {
        contract.getNextPrice().then( val => val )
    }

    const totalSupply = async () => {
        contract.totalSupply().then( val => val )
    }

    const balanceOf = async (addr) => {
        contract.balanceOf(addr).then( val => val )
    }

    const tokenURI = async (tokenId) => {
        contract.tokenURI(tokenId).then( val => val )
    }

    const safeMint = async (to) => {
        const tx = await contract.safeMint(to, { value: getMintPrice() });
        await tx.wait();
    };

    return {
        contract,
        chainId: contract.provider.network?.chainId,
        getPrice,
        getNextPrice,
        totalSupply,
        balanceOf,
        tokenURI,
        safeMint,
    };
};

export default useSVGieContract;