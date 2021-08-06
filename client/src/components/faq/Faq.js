import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import arrow from '../../assets/images/down-arrow-24820.ico';
import { addToDb, getItems } from "../../service/ProductService";
import './Faq.css'

export default function FaqC(props) {

    const [data, setData] = useState({ title: "Faq", rows: [] });
    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        props.goToTop();
    }, [props])

    const addQuestion = (event) => {
        event.preventDefault();
        if (newQuestion !== "") {
            addToDb("faq/addQuestion", {
                id: data.rows.length + 1,
                title: newQuestion,
                content: "Thanx for asking we'll try answering soon."
            })
            setNewQuestion("");
            getRows();
        }
    }

    async function getRows() {
        let rows_ = await getItems("faq/");
        setData({ ...data, rows: rows_ });
    }

    useEffect(() => {
        getRows();
    }, [newQuestion])

    const styles = {
        titleTextColor: "#43c1f3",
        rowTitleColor: "#8f9aa1",
        arrowColor: "#43c1f3",
        rowTitlePaddingLeft: '50px',
    };

    const config = {
        animate: true,
        arrowIcon: arrow.default
    };

    return (
        <div className="container faq">
            {data.rows !== [] ? <div>
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />
                <form onSubmit={addQuestion}>
                    <textarea value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} name="styled-textarea" id="styled" placeholder="Have a different question? Add yours here and we'll try to answer you as quick as possible">Enter your comment here...</textarea>
                    <br />
                    <input type="button" value="Submit" className="floatright " onClick={addQuestion} />
                </form>
            </div> :
                <div class="lds-facebook"><div></div><div></div><div></div></div>}
        </div>
    )
}
