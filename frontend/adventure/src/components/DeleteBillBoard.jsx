import React from "react";
import { useParams } from "react-router-dom";

function DeleteBillBoard(){
    const params = useParams()

    return (
        <>
            View {params} 
        </>
    )
}

export default DeleteBillBoard