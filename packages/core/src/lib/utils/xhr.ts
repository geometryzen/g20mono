export function xhr(url: string, callback: (responseText: string) => void): XMLHttpRequest {

    const rqst = new XMLHttpRequest();

    rqst.open('GET', url);

    rqst.onreadystatechange = function () {
        if (rqst.readyState === 4 && rqst.status === 200) {
            callback(rqst.responseText);
        }
    };

    rqst.send();

    return rqst;
}
