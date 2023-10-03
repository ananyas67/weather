getData();
async function getData(){
  const response = await fetch('/api');
  const data = await response.json();
  
  for (item of data){
    const root = document.createElement('div');
    const geo = document.createElement('div');
    const cond = document.createElement('div');
    const temp = document.createElement('div');
    const date = document.createElement('div');
    
    geo.textContent = `${item.lat}, ${item.lon}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    cond.textContent = `${item.cond}`;
    temp.textContent = `${item.temp}`;
    
    root.append( geo, date, cond , temp);
    document.body.append(root);
  }
  console.log(data);
}