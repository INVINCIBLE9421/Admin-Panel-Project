import '../App.css';    
import React,{useEffect,useState} from "react";
import Role from '../components/accounts/useRole'

const AccountPage = () =>{
    const storeAPIData = JSON.parse(localStorage.getItem("apiData"))
    const accountsPage = storeAPIData.accountsPage
    const accountsPageKey = Object.keys(accountsPage)

    const [selectedAccount, setSelectedAccount] = useState('');   

    const handleSelect = (e) =>{
        setSelectedAccount(e.target.value)
    };

    let data = storeAPIData.accountsPage[selectedAccount];
    
    useEffect(()=>{
        data=storeAPIData.accountsPage[selectedAccount];
    },[selectedAccount])

    function handleStoreData(formData){
        accountsPageKey.map((key) =>{
            if(key === selectedAccount){
                return storeAPIData.accountsPage[key] = formData;
            }else{
                return storeAPIData.accountsPage[key]
            }
        })
        localStorage.apiData=JSON.stringify(storeAPIData)
        alert('${selectedAccount} data updated successfully')
    }

    return(
        <div className='accountPage'>
            <div className='selectDiv'>
                <h2>List of Accounts</h2>
                <p>Account</p>
                <form>
                    <select name="user" onChange={handleSelect} className='custom-select'>
                        <option value="">Select Account</option>
                        {
                            accountsPageKey.map((key) => <option key={key} value={key}>{key}</option>)
                        }
                    </select>
                </form>
            </div>
            <Role data={data} handleStoreData={handleStoreData}/>
        </div>
    )
}

export default AccountPage;