import React, {useEffect, useState} from 'react'
import {useSelector , useDispatch} from "react-redux" ;
import {selectedClass} from "../../../features/selectClassSlice" ;
import {selectUser} from "../../../features/userSlice" ;
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#33ab9f',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

function GradeAssignments() {
    const classes = useStyles();
    const selectClass = useSelector(selectedClass) ;
    const user = useSelector(selectUser) ;
    const [isBusy, setBusy] = useState(false)
    const [rows, setRows] = useState([])
    useEffect(()=>{
        var userid = null
        axios.get("http://localhost:5000/users/getusers/"+user.uid)
        .then((res)=>{
            userid = res.data[0]._id
        })
        axios.get("http://localhost:5000/classes/getassignments/class/"+selectClass.id)
        .then((res)=>{
            res.data.map((item)=>{
                console.log(item)
                var assignment = item.aid.title
                var totalmarks = item.aid.totalMarks
                item.aid.studentMarks.map((id)=>{
                    if(userid===id.sid){
                        setRows(rows=>[...rows, {assignmentName: assignment, totalMarks:totalmarks, marks: id.marks}])
                    }
                })
            })
        })
    }, [])

    return (
        <>
        <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Assignment</StyledTableCell>
            <StyledTableCell align="right">Marks</StyledTableCell>
            <StyledTableCell align="right"> Total Marks</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => ( 
            <StyledTableRow /* key={row.assignmentName} */>
              <StyledTableCell component="th" scope="row">
                {row.assignmentName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.marks}</StyledTableCell>
              <StyledTableCell align="right">{row.totalMarks}</StyledTableCell>
            </StyledTableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}

export default GradeAssignments
