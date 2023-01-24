// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DonatingContract {
   
    struct HealthCase {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => HealthCase) public healthCases;

    uint256 public numberOfHealthCases = 0;

    function createHealthCase(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        HealthCase storage healthCase = healthCases[numberOfHealthCases];

        require(healthCase.deadline < block.timestamp, "The deadline should be a date in the future.");

        healthCase.owner = _owner;
        healthCase.title = _title;
        healthCase.description = _description;
        healthCase.target = _target;
        healthCase.deadline = _deadline;
        healthCase.amountCollected = 0;
        healthCase.image = _image;

        numberOfHealthCases++;

        return numberOfHealthCases - 1;
    }

     function donateToHealthCase(uint256 _id) public payable {
        uint256 amount = msg.value;

        HealthCase storage healthCase = healthCases[_id];

        healthCase.donators.push(msg.sender);
        healthCase.donations.push(amount);

        (bool sent,) = payable(healthCase.owner).call{value: amount}("");

        if(sent) {
            healthCase.amountCollected = healthCase.amountCollected + amount;
        }
    }

     function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (healthCases[_id].donators, healthCases[_id].donations);
    }

    function getHealthCases() public view returns (HealthCase[] memory) {
        HealthCase[] memory allHealthCases = new HealthCase[](numberOfHealthCases);

        for(uint i = 0; i < numberOfHealthCases; i++) {
            HealthCase storage item = healthCases[i];

            allHealthCases[i] = item;
        }

        return allHealthCases;
    }
}
