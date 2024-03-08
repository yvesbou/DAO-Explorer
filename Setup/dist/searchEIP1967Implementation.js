import { ethers } from "ethers";
const provider = new ethers.InfuraProvider("mainnet", process.env.INFURY_API_KEY);
const decoder = new ethers.AbiCoder();
const account = "0xe1c9a196BfDA959c19de7e8a59C17cAA57034f86";
// 0x360...bbc is the location where a EIP1967 stores the implementation contract address
const position = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const storageSlotValue = await provider.getStorage(account, position);
const implementationAddress = decoder.decode(['address'], storageSlotValue);
// ethers.utils.defaultAbiCoder.decode(['address'], '0x0000000000000000000000002d4cffc2a90e28d90d3404a83bfd774294a3970a')
// ethers.AbiCoder.defaultAbiCoder.
console.log(implementationAddress);
// console.log(storageSlotValue)
// console.log(parseInt(storageSlotValue, 16))
console.log("hello world");
//# sourceMappingURL=searchEIP1967Implementation.js.map