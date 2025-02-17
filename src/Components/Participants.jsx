import React, { useEffect, useState } from 'react'
import '../Static/registered.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "../../node_modules/datatables.net-dt/css/dataTables.dataTables.min.css"; // ✅ Correct CSS import
import $ from "jquery"; // ✅ Import jQuery
import "datatables.net"; // ✅ Import DataTables

const Participants = () => {
    const [users, setUsers] = useState([]); // Change initial state to null

    useEffect(() => {
        axios
            .get("http://localhost:3333/users")
            .then((res) => {
                setUsers(res.data);
                console.log(users)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let table;
        if (users.length > 0) {
            if ($.fn.DataTable.isDataTable('#student_table')) {
                $('#student_table').DataTable().destroy();
            }
            
            table = $('#student_table').DataTable({
                columnDefs: [
                    { targets: 4, searchable: true }
                ]
            });
    
            $('#eventFilter').on('change', function () {
                let selectedEvent = $(this).val();
                table.column(4).search(selectedEvent).draw();
            });
        }
    
        return () => {
            if (table) {
                table.destroy();
            }
        };
    }, [users]);       

    return (
        <div>
            <div class="container mt-4">
                <h1 class="text-center text-success">Registered Students</h1>
                <div class="mb-3">
                    <label for="eventFilter" class="form-label">Filter by Event:</label>
                    <select id="eventFilter" class="form-select">
                        <option value="">All Events</option>
                        <option value="CodeIgnite 2025">CodeIgnite 2025</option>
                        <option value="Web Wizards Workshop">Web Wizards Workshop</option>
                        <option value="Hack the Freshers">Hack the Freshers</option>
                    </select>
                </div>
                <div>
                    <table id="student_table" class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Event</th>
                                <th scope="col">Fees</th>
                                <th scope="col">City</th>
                                <th scope="col">State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr>
                                        <td>{user.roll_no}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td data-filter={user.event}>{user.event}</td>
                                        <td>{user.fees}</td>
                                        <td>{user.city}</td>
                                        <td>{user.state}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                            
                </div>
                <Link className="submitted-btn btn btn-primary" to="/">Go to Home Page</Link>
                <Link className="submitted-btn btn btn-primary" to="/register">Register Another Event</Link>
            </div>
        </div>
    )
}

export default Participants