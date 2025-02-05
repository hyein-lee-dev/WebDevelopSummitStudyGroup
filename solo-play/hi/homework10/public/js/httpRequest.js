class HttpRequest {
    constructor(){
        this.responseStatus = "";
    }

    postData(url = '', data = {}, callback, err_callback) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then((response) => {
          if(response.status === 200) {
              this.responseStatus = `success`;
              return response.json();
          } else if(response.status === 400) {
              this.responseStatus = `fail`;
              return response.json();
          } else {
              this.responseStatus = `fail`;
              let error_msg = response.body();
              console.error(`[HttpRequest] unknwon error occur`);
              return error_msg;
          }
      })
      .then(response => {
          if(this.responseStatus === `success`){
              callback(response);
          } else {
              err_callback(response);
          }
      });
    }
}