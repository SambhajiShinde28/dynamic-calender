import "../styles/calenderStyle.css"
import { useRef, useState } from "react";

const localStorageKeys = []

const CalenderComponent = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [dialogueBoxDate, setDialogueBoxDate] = useState()
    const [refresh, setRefresh] = useState()

    const eventNameRef = useRef("null")
    const startTimeRef = useRef("null")
    const endTimeRef = useRef("null")
    const descriptionRef = useRef("null")
    const eventTypeRef = useRef("null")
    const dialoguaBoxRef = useRef()


    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const handleMonthChange = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const today = new Date();
    const isToday = (day) => {
        return day &&
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
    };

    const isSunday = (day, month, year) => {
        const sunday = day && (new Date(year, month, day).getDay() === 0);
        return sunday
    }

    const isSaturday = (day, month, year) => {
        const saturday = day && (new Date(year, month, day).getDay() === 6);
        return saturday
    }

    const event = (day, month, year) => {
        try {

            const evDate = day + "/" + month + "/" + year
            const eventData = JSON.parse(localStorage.getItem(`event_${evDate}`)).date;
            const eventType = JSON.parse(localStorage.getItem(`event_${evDate}`)).eType;
            if (eventData) {
                if (eventType === "Personal") {
                    return "#FF1493"
                } 
                else if(eventType === "Work") {
                    return "#39FF14"
                }
            }

        } catch (error) {
            return false
        }
    }

    const CutIconClicked = () => {
        dialoguaBoxRef.current.style.display = "none"
    }

    const EditBTNClicked = () => {

        try {

            const localData = JSON.parse(localStorage.getItem(`event_${dialogueBoxDate}`))

            if (dialogueBoxDate == localData.date) {

                eventNameRef.current.disabled = false;
                startTimeRef.current.disabled = false;
                endTimeRef.current.disabled = false;
                descriptionRef.current.disabled = false;
                eventTypeRef.current.disabled = false;

            }
        }
        catch (error) {
            alert("Not any event Scheduled on this data to update!")
            dialoguaBoxRef.current.style.display = "none"
        }
    }

    const CloseBTNClicked = () => {

        try {
            localStorage.removeItem(`event_${dialogueBoxDate}`)

            eventNameRef.current.value = ""
            startTimeRef.current.value = ""
            endTimeRef.current.value = ""
            descriptionRef.current.value = ""

            eventNameRef.current.disabled = false;
            startTimeRef.current.disabled = false;
            endTimeRef.current.disabled = false;
            descriptionRef.current.disabled = false;
        }
        catch (error) {
            alert("Sorry there is nothing to delete!")
        }
    }

    const AddBTNClicked = () => {

        const eventType = eventTypeRef.current.value
        const eventName = eventNameRef.current.value
        const startTime = startTimeRef.current.value
        const endTime = endTimeRef.current.value
        const description = descriptionRef.current.value

        const eventData = {
            date: dialogueBoxDate,
            name: eventName,
            start: startTime,
            end: endTime,
            desc: description,
            eType: eventType,
        }

        localStorage.setItem(`event_${dialogueBoxDate}`, JSON.stringify(eventData))

        if (localStorageKeys.indexOf(`event_${dialogueBoxDate}`) == -1) {
            localStorageKeys.push(`event_${dialogueBoxDate}`)
            localStorage.setItem('eventKeys', JSON.stringify(localStorageKeys))
        }

        alert("Data saved successfully!")
        dialoguaBoxRef.current.style.display = "none"

        eventNameRef.current.value = ""
        startTimeRef.current.value = ""
        endTimeRef.current.value = ""
        descriptionRef.current.value = ""
        eventTypeRef.current.value = ""

        setRefresh("refresh")
    }

    const ClickOnDayEvent = (day, month, year) => {
        setDialogueBoxDate(day + "/" + month + "/" + year)

        eventNameRef.current.disabled = false;
        startTimeRef.current.disabled = false;
        endTimeRef.current.disabled = false;
        descriptionRef.current.disabled = false;
        eventTypeRef.current.disabled = false;

        dialoguaBoxRef.current.style.display = "flex"

        try {

            const newDate = day + "/" + month + "/" + year

            const data = JSON.parse(localStorage.getItem(`event_${newDate}`))

            if (data.date == newDate) {
                eventNameRef.current.value = data.name
                startTimeRef.current.value = data.start
                endTimeRef.current.value = data.end
                descriptionRef.current.value = data.desc
                eventTypeRef.current.value = data.eType

                eventNameRef.current.disabled = true;
                startTimeRef.current.disabled = true;
                endTimeRef.current.disabled = true;
                descriptionRef.current.disabled = true;
                eventTypeRef.current.disabled = true;
            }

        }
        catch (error) {

            eventNameRef.current.value = ""
            startTimeRef.current.value = ""
            endTimeRef.current.value = ""
            descriptionRef.current.value = ""
        }

    }


    return (
        <>
            <div className="calender-container">
                <div className="calendar-header">
                    <button onClick={() => handleMonthChange(-1)}>Previous</button>
                    <h2>
                        {currentDate.toLocaleString('default', { month: 'long' })} {year}
                    </h2>
                    <button onClick={() => handleMonthChange(1)}>Next</button>
                </div>

                <div className="calendar-grid">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                        <div key={day} className="calendar-day-header">
                            {day}
                        </div>
                    ))}

                    {days.map((day, index) => (
                        <div key={index} onClick={() => ClickOnDayEvent(day, currentDate.toLocaleString('default', { month: 'long' }), year)} className={`calendar-day ${day ? '' : 'empty'} ${isToday(day) ? 'highlight' : ''} ${isSunday(day, month, year) ? 'sunday' : ''} ${isSaturday(day, month, year) ? 'saturday' : ''}`} style={{ backgroundColor: event(day, currentDate.toLocaleString('default', { month: 'long' }), year) ? event(day, currentDate.toLocaleString('default', { month: 'long' }), year) : '' }}>
                            {day}
                        </div>
                    ))}
                </div>
            </div>

            <div className="dialoguebox-container" ref={dialoguaBoxRef}>
                <div className="dialoguefield-container">
                    <span onClick={CutIconClicked} className="material-symbols-outlined cut-icon">close</span>
                    <h3>You are setting event for date : {dialogueBoxDate}</h3>
                    <div className="editclosebtn-container">
                        <button type="button" onClick={EditBTNClicked}>Edit</button>
                        <button type="button" onClick={CloseBTNClicked}>Close</button>
                    </div>

                    <div className="event-type">
                        <label>Event Type</label>
                        <select ref={eventTypeRef} defaultValue="Work">
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>

                    <div className="dialogue-field">

                        <label>Event Name</label>
                        <input type="text" name="EventName" ref={eventNameRef} placeholder="Event Name" />

                        <div className="StartEndTime">
                            <span className="start-time">
                                <label>Start Time</label>
                                <input type="time" defaultValue="10:45" ref={startTimeRef} />
                            </span>

                            <span className="end-time">
                                <label>End Time</label>
                                <input type="time" defaultValue="07:09" ref={endTimeRef} />
                            </span>

                        </div>

                        <label>Description</label>
                        <textarea placeholder="Enter event description.." ref={descriptionRef} rows="5" color="40"></textarea>

                        <button type="button" onClick={AddBTNClicked}>Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalenderComponent