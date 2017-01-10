<div id="content">
    <Index wdata='{%json_encode($data)%}'></Index>
</div>
{%script%}
    require("./index.js").init();
{%/script%}