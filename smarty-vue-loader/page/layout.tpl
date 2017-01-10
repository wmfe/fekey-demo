{%extends file="nerve_cfecommon/page/layout.tpl"%}
{%block name="top-head-extend-cut"%}
    {%require name="nerve_cfecommon:static/css/element.css"%}
    {%require name="nerve_bmbackend:static/css/layout.less"%}
    {%require name="nerve_cfecommon:static/libs/vue.js"%}
    {%require name="nerve_cfecommon:static/libs/element.js"%}
    {%require name="nerve_bmbackend:static/libs/md5.js"%}
{%/block%}
{%block name="page-main-content"%}
    <div class="marketing-container">
        <div class="marketing-wrapper">
            {%block name="bmbackend"%}{%/block%}
        </div>
    </div>
{%/block%}