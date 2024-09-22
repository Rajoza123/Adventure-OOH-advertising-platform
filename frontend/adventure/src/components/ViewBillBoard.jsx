import React from "react";
import { useParams } from "react-router-dom";

function ViewBillBoard(){
    const params = useParams()

    return (
        <>
            View {params.id} 
        </>
    )
}

export default ViewBillBoard