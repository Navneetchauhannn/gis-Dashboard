import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';

export default function AddContainers({ closeEvent }) {
    const [containerid, setContainerid] = useState("");
    const [tagid, setTagid] = useState("");
    const [indate, setIndate] = useState("");
    const [containersize, setContainersize] = useState("");
    const setRows = useAppStore((state)=>state.setRows);
    const empCollectionRef = collection(db, "containers");

    const addContainer = async () => {
        await addDoc(empCollectionRef, {
            contanierID: containerid,
            tagID: tagid,
            inDate: indate,
            size: containersize
        });
        getContainers();
        closeEvent();
        Swal.fire("Submitted!", "Your record has been submitted,", "success");
    }

    const getContainers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>
                Add Containers
            </Typography>
            <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton>
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Container-ID" value={containerid} onChange={(e)=>{setContainerid(e.target.value)}} variant="outlined" size='small' sx={{ minWidth: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Tag-ID" variant="outlined" value={tagid} onChange={(e)=>{setTagid(e.target.value)}} size='small' sx={{ minWidth: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="In-Date" variant="outlined" value={indate} onChange={(e)=>{setIndate(e.target.value)}} size='small' sx={{ minWidth: "100%" }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Size" variant="outlined" value={containersize} onChange={(e)=>{setContainersize(e.target.value)}} size='small' sx={{ minWidth: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={addContainer}>
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ m: 4 }} />
        </>
    )
}
