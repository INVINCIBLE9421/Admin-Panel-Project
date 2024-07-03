import '../App.css'
import React from 'react'
import LineChart from '../components/charts/lineChart'
import BarChart from '../components/charts/barChart'
import PieChart from '../components/charts/pieChart'

const DashBoard = () =>{

    const storedAPIData = JSON.parse(localStorage.getItem("apiData")) || {}
    const notifications = storedAPIData?.dasbhoardPage?.notifications || []
    const orders = storedAPIData?.dasbhoardPage?.orders || []

    return(
        <div className='dashboard'>
            <div className='row'>
                <p className='tittle'>
                    Welcome back, <strong>Admin</strong>
                </p>
            </div>
            <div className='cards'>
                <div className='con'><h2>Latest Hits</h2><LineChart/></div>
                <div className='con'><h2>Performance</h2><BarChart/></div>
                <div className='con'><h2>Storage Information</h2><PieChart/></div>
                <div className='con'>
                    <h2>Notification List</h2>
                    {
                        notifications.map((eachNotification,index) => {
                            const {pic,message,time} = eachNotification;
                            return(
                                <div className='noti1' key={index}>
                                    <div className='imgdiv'>
                                        <img src={pic} alt='userPic' className='notificationImage'/>
                                    </div>
                                    <div>
                                        <p>{message}</p>
                                        <div>
                                            {time} age.
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='tablediv'>
                <h2>Orders List</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ORDER NO.</th>
                            <th>STATUS</th>
                            <th>OPERATORS</th>
                            <th>LOCATION</th>
                            <th>DISTANCE</th>
                            <th>START DATE</th>
                            <th>EST DELIVERY DUE</th>
                        </tr>
                    </thead>
                    <tbody className='tablebody'>
                        {
                            orders.map((eachOrder) =>{
                                const {deliveryDate,orderNo,status,operators,location,distance,startDate} = eachOrder
                                return(
                                    <tr key={orderNo}>
                                        <td>#{orderNo}</td>
                                        <td>{status}</td>
                                        <td>{operators}</td>
                                        <td>{location}</td>
                                        <td>{distance} km</td>
                                        <td>{startDate}</td>
                                        <td>{deliveryDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashBoard;