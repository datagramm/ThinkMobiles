import $ from 'jquery'


export const request = async (url, method, data = null) => {
    try {
        const developmentURL = 'http://localhost:3000'
        $.ajaxSetup({
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
        });
        if (data && method === 'POST')  return  await  $.post(`${developmentURL}${url}`, data);
        if (method === 'GET') return  await $.get(`${developmentURL}${url}`)

    }
    catch (err){
        console.log(err)
        return err.responseJSON;

    }


}