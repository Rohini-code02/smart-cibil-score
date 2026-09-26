fetch("https://tagfuiovsvbudddasyjx.supabase.co/rest/v1/profiles?select=*", {
  headers: {
    apikey: "sb_publishable_DnQ_z_T68y8zEI9gCImRdg_6EUTnYuK",
    Authorization: "Bearer sb_publishable_DnQ_z_T68y8zEI9gCImRdg_6EUTnYuK"
  }
}).then(res => {
  console.log("Status:", res.status);
  return res.text();
}).then(text => console.log(text)).catch(console.error);
