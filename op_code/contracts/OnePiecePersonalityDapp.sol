// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "./OnePieceNFT.sol";

contract OnePiecePersonalityDapp is VRFConsumerBase {
    OnePieceNFT private onePieceNFTContract;

    VRFCoordinatorV2Interface private i_vrfCoordinator;
    bytes32 private i_keyHash;
    uint32 private i_callbackGasLimit;
    uint64 private i_subscriptionId;

    // Chainlink VRF variables
    uint256 private randomResult;
    bytes32 private requestId;

    // Mapping to track user's assigned character
    mapping(address => uint256) private userCharacter;

    // Events
    event CharacterAssigned(address indexed user, uint256 characterId);

    constructor(
        address _nftContract,
        address vrfCoordinatorV2Address,
        uint64 subId,
        bytes32 keyHash,
        uint32 callbackGasLimit
    )
        VRFConsumerBase(vrfCoordinatorV2Address)
    {
        onePieceNFTContract = OnePieceNFT(_nftContract);
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2Address);
        i_subscriptionId = subId;
        i_keyHash = keyHash;
        i_callbackGasLimit = callbackGasLimit;
    }

    // Function to trigger randomness generation
    function askQuestionsAndAssignCharacter() external {
        // Logic to ask questions to the user
        
        // Generate randomness using Chainlink VRF
        requestId = requestRandomness(i_keyHash, i_callbackGasLimit);
    }

    // Callback function called by Chainlink VRF
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        uint256 characterId = randomResult % 3 + 1; // Assuming there are 3 characters
        address user = msg.sender;
        userCharacter[user] = characterId;
        onePieceNFTContract.mintCharacterNFT(characterId);
        emit CharacterAssigned(user, characterId);
    }
}