pragma solidity >=0.4.22 <0.6.0;

contract Test {
    address payable public owner;
    constructor() public {
        owner = msg.sender;
    }
    
    mapping(address => string) public addrToName;
    mapping(string => address) nameToAddr;
    mapping(string => address payable) nameHolder;
   
    address public toShowAddr;
    string public toShowName;
    address public nowNameHolder;
    
    function register(address toregister, string memory name) public payable{
        require(msg.value == 0.1 ether && nameToAddr[name] == address(0) && bytes(addrToName[toregister]).length == 0);
        addrToName[toregister] = name;
        nameToAddr[name] = toregister;
        nameHolder[name] = msg.sender;
    }
    
    function getNameHolder(string memory name) public payable returns (address){
        require(nameHolder[name] != address(0));
        nowNameHolder = nameHolder[name];
        return nowNameHolder;
    }
    
    function getName(address addr) public payable returns (string memory) {
        require(msg.value == 0.01 ether && bytes(addrToName[addr]).length > 0);
        toShowName = addrToName[addr];
        address(this).transfer(0.005 ether);
        nameHolder[toShowName].transfer(0.005 ether);
        return toShowName;
    }
    
    function getAddr(string memory name) public payable returns (address) {
        require(msg.value == 0.01 ether && nameHolder[name] != address(0));
        address(this).transfer(0.005 ether);
        nameHolder[name].transfer(0.005 ether);
        toShowAddr = nameToAddr[name];
        return toShowAddr;
    }
    
    function changeAddr (string memory name, address toAddr) public payable {
        require(msg.value == 0.1 ether && msg.sender == nameHolder[name]);
        nameToAddr[name] = toAddr;
    }
    
    function transferNameOwner (string memory name, address payable newOwner) public payable {
        require(msg.value == 0.1 ether && nameHolder[name] == msg.sender );
        nameHolder[name] = newOwner;
    }
    
    function withdraw (uint amount) public payable {
        require( address(this).balance >= amount && owner == msg.sender );
        msg.sender.transfer(amount);
    }
    
    function selfDestruct() public payable{
        require(msg.sender == owner);
        selfdestruct(owner);
    }
    
    function () external payable {
    } 
}