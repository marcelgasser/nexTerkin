import React, { useState, useEffect } from "react";

import { Form, Button, Spinner, Confirmation } from "./UiComponents";
import { Wifi, Lock } from "react-feather";

export function WifiPage(props) {
    const [state, setState] = useState({ captivePortal: [], ssid: []});
    const [forgetModal, setForgetModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);

    useEffect(() => {
        document.title = "WiFi Settings";
        fetch(`${props.API}/api/wifi/get`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setState(data);
            });
    }, []);

    function changeWifi() {
        fetch(`${props.API}/api/wifi/set?ssid=${escape(document.getElementById("ssid").value.trim())}&pass=${escape(document.getElementById("pass").value.trim())}`, { method: "POST" });
        document.getElementById("ssid").value = "";
        document.getElementById("pass").value = "";
    }

    const form = <><Form>
        <p><label htmlFor="ssid"><Wifi /> SSID:</label>
            <input type="text" id="ssid" name="ssid" autoCapitalize="none" />
        </p>
        <p><label htmlFor="pass"><Lock /> Password:</label>
            <input type="text" id="pass" name="pass" autoCapitalize="none" />
        </p>        
    </Form>
    <Button onClick={() => setSaveModal(true)}>Save</Button>
    </>;
    
    let page = <><h2>WiFi Settings</h2> 
        <h3>Status</h3></>;
    
    let connectedTo;
    if (state.captivePortal === true) {
        connectedTo = "Captive portal running";
    } else if (state.captivePortal === false) {
        connectedTo = <>Connected to {state.ssid} (<a onClick={() => setForgetModal(true)}>Forget</a>)</>;
    }
    
    page = <>{page}<p>{connectedTo == null ? <Spinner /> : connectedTo}</p></>;

    page = <>{page}<h3>Update credentials</h3>{form}
        <Confirmation active={forgetModal}
            confirm={() => { fetch(`${props.API}/api/wifi/forget`, { method: "POST" }); setForgetModal(false); }}
            cancel={() => setForgetModal(false)}>Are you sure? If you continue, a captive portal will be started.</Confirmation>
        <Confirmation active={saveModal}
            confirm={() => { changeWifi(); setSaveModal(false); }}
            cancel={() => setSaveModal(false)}>Are you sure? If you continue, device access from the current network will probably be lost.</Confirmation>
    </>;

    return page;
}

