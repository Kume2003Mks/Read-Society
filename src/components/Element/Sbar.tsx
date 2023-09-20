import { Icon } from '@iconify/react';
import React from 'react'

const Sbar = () => {
  return (
    <div style={{paddingInline:"4px",paddingTop:"10px",paddingBlock:"10px"}}>
        
        <div style={{display:"flex",height:"35px",paddingTop:"3px",paddingBlock:"3px",borderWidth:"2px",borderRadius:"13px",borderColor:"#000",textAlign:"left"}}>
            <div style={{paddingInline:"4px",paddingTop:"4px"}}>
                <Icon icon="material-symbols:search" width="20" height="20" />
            </div>
            <input style={{width:"195px"}}
            placeholder="Search #Tag"
            />
            </div>
    </div>
  )
}

export default Sbar