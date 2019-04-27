import React, { Component } from 'react';
import './style.css';
const MyContract = window.web3.eth.contract(
    [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferNameOwner",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "nowNameHolder",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "toAddr",
                    "type": "address"
                }
            ],
            "name": "changeAddr",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "toregister",
                    "type": "address"
                },
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "register",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "getNameHolder",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "toShowName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "toShowAddr",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "getName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "addrToName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "selfDestruct",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "getAddr",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        }
    ]    
);
class Main extends Component {

    constructor (props) {
        super (props);

        this.state = {
            ContractInstance: MyContract.at('0xe062497074d242fc99eb9a33481f36f34f47b138'),
            destructed: false
        };         
    }



    shouldComponentUpdate(nextProps, nextState){
        return true;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    componentDidMount() {
        
        this.interval = setInterval(() => {
            this.getGotAddress();
            this.getGotNameHolder();
            this.getGotName();
            this.getContractOwner();
          }, 1000);
    }

    getContractOwner = () => {
        const { owner } = this.state.ContractInstance;
        owner((err,addr) => {
            this.setState({
                contractOwner: addr,
            })
            if (addr == "0x") {
                this.setState({
                    destructed : true
                })
            }
        })
    }

    handleRegister = (e) => {
        e.preventDefault();
        const { register } = this.state.ContractInstance;
        register(
            this.state.registerAddr,
            this.state.registerName,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0.1,'ether')
            }, (err, result) => {
                console.log('changing');
            }
        )
    }

    handleChangeAddress = (e) => {
        e.preventDefault();
        const { changeAddr } = this.state.ContractInstance;
        changeAddr(
            this.state.changingName,
            this.state.changingAddress,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0.1,'ether')
            }, (err, result) => {
            }
        )
    }

    transferNameOwner = (e) => {
        e.preventDefault();
        const { transferNameOwner } = this.state.ContractInstance;
        transferNameOwner(
            this.state.nameToBeChanged,
            this.state.newOwner,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0.1,'ether')
            }, (err, result) => {
            }
        )       
    }

    getGotAddress = () => {
        const { toShowAddr } = this.state.ContractInstance;
        toShowAddr ((err,addr) => {
            this.setState({
                gotAddress: addr,
            })
        })
    }

    getAddr = (e) => {
        e.preventDefault();
        const { getAddr } = this.state.ContractInstance;
        getAddr(
            this.state.getAddr,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0.01,'ether')
            }, (err, event) => {
            }
        )
    }
    getGotName = () => {
        const { toShowName } = this.state.ContractInstance;
        toShowName ((err,name) => {
            this.setState({
                gotName: name,
            })
        })
    }

    getName = (e) => {
        e.preventDefault();
        const { getName } = this.state.ContractInstance;
        getName(
            this.state.getName,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0.01,'ether')
            }, (err, event) => {
            }
        )
    }

    getGotNameHolder = () => {
        const { nowNameHolder } = this.state.ContractInstance;
        nowNameHolder ((err,name) => {
            this.setState({
                gotNameHolder: name,
            })
        })
    }

    getNameHolder = (e) => {
        e.preventDefault();
        const { getNameHolder } = this.state.ContractInstance;
        getNameHolder(
            this.state.getNameHolder,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0, 'ether')
            }, (err, event) => {
            }
        )
    }

    withdrawl = (e) => {
        e.preventDefault();
        const { withdraw } = this.state.ContractInstance;
        withdraw(
            this.state.withdrawlAmount,
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0,'ether')
            }, (err, event) => {
            }
        )
    }

    destruct = (e) => {
        e.preventDefault();
        const { selfDestruct } = this.state.ContractInstance;
        selfDestruct(
            {
                gas: 300000,
                from: window.web3.eth.accounts[0],
                value: window.web3.toWei(0,'ether')
            }, (err, event) => {
            }
        )
        this.setState({
            destructed:true
        })
    }

viewNewContract = (e) => {
    this.setState({
        ContractInstance: MyContract.at(this.state.newContract),
        destructed: false
    })
}

    render() {  
        return (
            <div>
                 <input
                            type="text"
                            name="newContract"
                            placeholder="새 Contract 주소"
                            onChange={this.handleChange}
                        />
                    <button onClick = {this.viewNewContract}>새 컨트랙트 보기</button><br/>
                    <br/><hr/><br/>
                { this.state.destructed ?
                    <div>
                    파기됐거나 파기될 예정인 컨트랙트임<br/>
                    컨트랙트의 주인이 파기한게아니면 파기되지 않았을것<br/><br/><br/>
                   
                    </div>  : 
                <div>
                    이 Contract의 주인 :&nbsp;
                    {this.state.contractOwner} <br/>
    <br/>
                    <form onSubmit={this.handleRegister}>
                        <input
                            type="text"
                            name="registerAddr"
                            placeholder="등록할 주소"
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="registerName"
                            placeholder="등록할 도메인"
                            onChange={this.handleChange}
                        />
                        <button type="submit">Register</button>
                    </form>

                    <br/>

                    <input
                        type="text"
                        name="getAddr"
                        placeholder="도메인(주소를 반환)"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.getAddr}>주소 찾기 시작</button><br />

                    이 도메인의 주소: {this.state.gotAddress}

                    <br/><br/>

                    <input
                        type="text"
                        name="getName"
                        placeholder="주소(도메인을 반환)"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.getName}>도메인 찾기 시작</button><br />
                   
                    이 주소의 도메인: {this.state.gotName}
                    <br /><br/>

                    <input
                        type="text"
                        name="getNameHolder"
                        placeholder="도메인(도메인의 주인의 주소를 반환)"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.getNameHolder}>도메인 주인 찾기 시작</button><br />
                
        
                    이 도메인의 주인: {this.state.gotNameHolder}
                    <br/><br/>

                    <form onSubmit={this.handleChangeAddress}>
                        <input
                            type="text"
                            name="changingName"
                            placeholder="주소를 바꿀 도메인"
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="changingAddress"
                            placeholder="이 주소로 변경"
                            onChange={this.handleChange}
                        />
                        <button type="submit">변경하기</button>
                    </form>

                    <br/>

                    <form onSubmit={this.transferNameOwner}>
                        <input
                            type="text"
                            name="nameToBeChanged"
                            placeholder="주인을 바꿀 도메인"
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="newOwner"
                            placeholder="주인을 이 주소로 변경"
                            onChange={this.handleChange}
                        />
                        <button type="submit">도메인 주인 변경하기</button>
                    </form>
                
                    <br/>

                    <input
                        type="text"
                        name="withdrawlAmount"
                        placeholder="출금할 금액(wei)"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.withdrawl}>출금하기</button>
                    <br/><br/>

                    <button onClick={this.destruct}>selfDestruct</button>
                    <br/><br/>    
                </div>
                }
               <hr /> 
                주소, 도메인, 도메인주인은 1초에 한번씩 자동으로 새로고침 <br/>
                시작하기 버튼을 누르기 전에 나오는 값은 상관없음(이전에 확인했던게 public변수에 저장되어있는것) <br />

                destructd 창에서 새 컨트랙트 보기를 해도 새로고침하면<br/>
                코드의 원본 주소 컨트랙트로 돌아감
                
            </div>
        );
    }
}

export default Main;