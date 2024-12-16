import React, { useRef, useState, useEffect } from "react";
import '../styles/EventListStyle.css'


const EventListComponents = () => {

    const selectedDay = useRef();
    const selectedMonth = useRef();
    const selectedYear = useRef();

    const [getedData,setGetedData] = useState([])
    
    useEffect(() => {

        const eventKeys = JSON.parse(localStorage.getItem("eventKeys"));
        
        const tempData = eventKeys.map((e) => {
            const originalData = localStorage.getItem(e);
            return originalData ? JSON.parse(originalData) : null;
        }).filter(item => item !== null); 
        setGetedData(tempData);

    }, []); 
    
    const SearchBTNClicked = () => {
        const day=selectedDay.current.value
        const month=selectedMonth.current.value
        const year=selectedYear.current.value
        
        try {
            const originalData = JSON.parse(localStorage.getItem(`event_${day}/${month}/${year}`))
            setGetedData([originalData])
        } 
        catch (error) {}
    };

    return (
        <div className="eventlist-container">
            <div className="filter-container">

                <select ref={selectedDay}>
                    <option value="">All</option>
                    {
                        Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))
                    }
                </select>

                <select ref={selectedMonth}>
                    <option value="">All</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                    ].map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>

                <select ref={selectedYear}>
                    <option value="">All</option>
                    {Array.from({ length: 101 }, (_, i) => (
                        <option key={2000 + i} value={2000 + i}>
                            {2000 + i}
                        </option>
                    ))}
                </select>

                <button onClick={SearchBTNClicked}>Search</button>
            </div>

            <div className="table-container">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Event Name</th>
                            <th>Event Type</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        getedData.length > 0 ? (
                            getedData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.name}</td>
                                    <td>{item.eType}</td>
                                    <td>{item.start}</td>
                                    <td>{item.end}</td>
                                    <td>{item.desc}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EventListComponents