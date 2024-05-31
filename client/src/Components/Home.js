import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";

function Home() {

    const [startDate, setStartDate] = useState(new Date());

    return <div className="main-container">
        <div className="sub-container">
            <h2>Welcome to BookBirkbeck</h2>
            <div className="name-input-box">
                <div>
                    First & Last Name*
                </div>
                <input
                    className="input-box"
                    type="text"
                    id="user-fname-input"
                    placeholder="First Name"
                    // onChange={onChangeUserInput}
                ></input>

                <input
                    className="input-box"
                    type="text"
                    id="user-lname-input"
                    placeholder="Last Name"
                    // onChange={onChangeUserInput}
                ></input>
            </div>
            <div className="capacity-box">
                <div>
                    Capacity*
                </div>
                <input
                    className="input-box"
                    type="text"
                    id="capacity-input"
                    placeholder="Please enter a value"
                    // onChange={onChangeUserInput}
                ></input>

            </div>

            <div>
                <div>
                    Select a Date*
                </div>
                <DatePicker className="input-box" showTimeSelect dateFormat="Pp" selected={startDate} onChange={(date) => setStartDate(date)}/>
                <DatePicker
                    // selected={date}
                    // onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                />
            </div>

            {/*<div>*/}
            {/*    <div>*/}
            {/*        Select Start Time**/}
            {/*    </div>*/}
            {/*    <DatePicker*/}
            {/*        selected={date}*/}
            {/*        onChange={handleDateChange}*/}
            {/*        showTimeSelect*/}
            {/*        dateFormat="Pp"*/}
            {/*    />*/}
            {/*</div>*/}

            <div>

                <form>
                    <div>Additional Requirement:</div>
                        <select className="input-box" name="cars" id="cars">
                            <option value="desktops">Desktop/Computers</option>
                            <option value="saab">Catering services</option>
                            <option value="opel">Other</option>
                        </select>
                </form>
            </div>

            <div>
                <button
                    className="search-button"
                    type="button"
                    // onClick={onClickFetch}
                >
                    Submit Booking
                </button>
            </div>

            {/*{isLoading && (*/}
            {/*    <CircularProgress*/}
            {/*        sx={{*/}
            {/*            color: "darkslategray",*/}
            {/*        }}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    </div>
}

export default Home;