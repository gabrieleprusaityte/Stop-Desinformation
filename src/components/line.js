import React, {useEffect, useState} from 'react';

const Line = ({site}) => {

    const [getStatus, setStatus] = useState(true)
    const [getRequest, setRequest] = useState(0)

    function send() {
        const options = {
            method: "GET",
            mode: "no-cors"
        }

        fetch(`http://${site}`, options)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                console.log(doc)
                setStatus(true)
                setRequest(getRequest + 1)
            }).catch(e => {
                setStatus(false)
            console.log('errr', e)
        })
    }

    useEffect(() => {
        send()
    }, [getRequest])



    return (
        <div className="line">
           <div className="flex grow1">{site}</div>
            <div className="flex grow1 j-center" style={{color: getStatus === true ? "green" : "red"}}>{getStatus ? "online" : "offline"}</div>
            <div className="flex grow1 f-end">{getRequest}</div>
        </div>
    );
};

export default Line;