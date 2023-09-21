import { Icon } from '@iconify/react';
import React from 'react'

const Sbar = () => {
  return (
    <div style={{paddingInline:"4px",paddingTop:"4px"}}>
        
        <div style={{borderWidth:"2px",borderRadius:"13px",borderColor:"red",textAlign:"left",display:"flex"}}>
            <div style={{paddingInline:"4px",paddingTop:"4px"}}>
                <Icon icon="material-symbols:search" />
            </div>
            <div style={{color:"#C9C9C9"}}>Search #Tag</div> 
            </div>
    </div>
  )
}

export default Sbar