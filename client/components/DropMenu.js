import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function DropMenu(props) {
    const [open, setOpen] = useState(false)
    const [voteForItem, setVoteForItem] = useState("Overall best picture")

    function changeHandler(e){
        setVoteForItem(e.target.value)
        props.voteFor(e.target.value)
    }

    return (
        <div>
            {/* <InputLabel id="demo-controlled-open-select-label">People will vote for?</InputLabel> */}
            <Select
                // labelId="demo-controlled-open-select-label"
                // id="demo-controlled-open-select"
                open={open}
                fullWidth
                variant="outlined"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={voteForItem}
                onChange={changeHandler}
                >
                <MenuItem value={"Overall best picture"}>Overall best picture</MenuItem>
                <MenuItem value={"Best styling & outfit"}>Best styling & outfit</MenuItem>
                <MenuItem value={"Other"}>Other (add a note)</MenuItem>
            </Select> 
        </div>
    )
}

export default DropMenu
