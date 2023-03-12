import React from "react";
import { useHistory } from 'react-router-dom';

export default function RedirectToLastVisitedPage(){
    const lastVisitedPage = useHistory();
    lastVisitedPage.goBack()
    return true
}
