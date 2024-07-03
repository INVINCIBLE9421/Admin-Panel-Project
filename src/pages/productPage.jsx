import '../App.css';
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faTrashAlt);

const ProductPage = () => {
    const navigate = useNavigate()
    const storedAPIData = JSON.parse(localStorage.getItem("apiData"));
    const products=storedAPIData.productsPage.products;
    const [checkList, setCheckList] = useState([]);
    const [productList, setProductList] = useState(products);

    const handleNavigateAddNewProduct = () => {
        navigate('/addProduct')
    }

    const handleCheckBox = (e) => {
        const {checked,name} = e.target;
        if(checked){
            setCheckList((prevItem) => [...prevItem,name])
        }
    }

    const handleDeleteSelected = () => {
        setProductList((prevItem) => prevItem.filter((item) => !checkList.includes(item.name)))
        setCheckList([])
    }

    const handleDeletedIcon = (name) => {
        setProductList((prevItem) => prevItem.filter((item) => item.name !== name))
    }

    useEffect(() => {
        // Object.keys(storedAPIData.productsPage).map((key) => {
        //     if(key!=='products'){
        //         return storedAPIData.productsPage[key] = productList
        //     }else return storedAPIData.productsPage[key]
        // })
        // localStorage.apiData = JSON.stringify(storedAPIData)
        storedAPIData.productsPage.products = productList;
        localStorage.setItem("apiData", JSON.stringify(storedAPIData));
    },[productList])

    return(
        <div className='productpage'>
            <div className='producttablediv'>
                <div className='producttable'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>PRODUCT NAME</th>
                                <th>UNIT SOLD</th>
                                <th>IN STOCK</th>
                                <th>EXPIRE DATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='tablebody'>
                            {
                                productList.map((eachProduct,index) => {
                                    const {name,unitSold,stock,expireDate} = eachProduct;
                                    return(
                                        <tr key={index}>
                                            <td><input type='checkbox' name={name} checked={checkList.includes(name)} onChange={handleCheckBox}/></td>
                                            <td>{name}</td>
                                            <td>{unitSold}</td>
                                            <td>{stock}</td>
                                            <td>{expireDate}</td>
                                            <td>
                                                <div style={{backgroundColor:"#394e64"}} className='binicondiv' onClick={()=>handleDeletedIcon(name)}>
                                                    <FontAwesomeIcon icon="far fa-trash-alt" size='lg' style={{color:"#ffffff"}}/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='buttondiv'>
                    <button onClick={handleNavigateAddNewProduct}>Add New Product</button>
                    <button onClick={handleDeleteSelected}>Delete Selected Product</button>
                </div>
            </div>
            <CategoriesTab/>
        </div>
    )
}

function CategoriesTab(){
    const storedAPIData=JSON.parse(localStorage.getItem("apiData"));
    console.log("storedAPIData",storedAPIData)
    const categories=storedAPIData.productsPage.categories
    console.log("categories",categories)
    const [categoriesList, setCategoriesList] = useState(categories)
    const [popup, setPopup] = useState(false)
    const [newCategory, setNewCategory] = useState("")

    const handleDeleteCategories = (clickItem) => {
        setCategoriesList((prevItem) => prevItem.filter((item) => item !== clickItem))
    }

    const handleAddCategory = () => {
        if(!categoriesList.includes(newCategory) && newCategory.length>3){
            setCategoriesList((prevItem) => [...prevItem,newCategory])
            alert("category added successfully")
            setPopup(false)
            setNewCategory("")
        }else if(categoriesList.includes(newCategory)){
            alert("category already exist")
        }else if(newCategory.length<=3){
            alert("please enter correct category")
        }
    }

    useEffect(() => {
        // Object.keys(storedAPIData.productsPage).map((each) => {
        //     if(each === "category"){
        //         return storedAPIData.productsPage[each]=categoriesList
        //     }else return storedAPIData.productsPage[each]
        // })
        // localStorage.setItem("apiData",JSON.stringify(storedAPIData))
        storedAPIData.productsPage.categories = categoriesList;
        localStorage.setItem("apiData", JSON.stringify(storedAPIData));
    },[categoriesList])

    return(
        <>
            <div className='catogery'>
                <h2>Product Categories</h2>
                <div className='producttable'>
                    {
                        <div>
                            <table className='table'>
                                <tbody className='tablebody'>
                                    {
                                        categoriesList.map((eachCategory,index) => {
                                            console.log("eachCategory",eachCategory)
                                            return <tr key={index}>
                                                <td>{eachCategory}</td>
                                                <td>
                                                    <div style={{backgroundColor:"#394e64"}} className='binicondiv' onClick={() => handleDeleteCategories(eachCategory)}>
                                                        <FontAwesomeIcon icon="far fa-trash-alt" size='lg' style={{color:"#ffffff"}}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <button onClick={() => setPopup(true)}>ADD NEW CATEGORY</button>
            </div>
            <div>
                {
                    popup && 
                    <div className='popup-container'>
                        <div className='popup'>
                            <input type='text' name='new Category' placeholder='enter a category' value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                            <button onClick={handleAddCategory}>ADD</button>
                            <button onClick={() => {setPopup(false); setNewCategory("")}}>CANCEL</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default ProductPage;
