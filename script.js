document.addEventListener('mousemove', function(e)
{
    var pencil = document.getElementById("pencil");
    var x = e.clientX - 5;
    var y = e.clientY - 5;
    pencil.style.transform= `translate(${x}px, ${y}px)`;
});