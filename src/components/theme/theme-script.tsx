// Runs before first paint so there is no flash of the wrong theme.
const SCRIPT = `(function(){try{var t=localStorage.getItem("studiospace-theme");var d=t?t==="dark":true;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){document.documentElement.classList.add("dark");}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}