export function ChangeLang(props: { currectLang: string }) {
  function Change(value: string) {
    window.location.href = "/" + value;
  }
  return (
    <select
      name="Sysmet language"
      id=""
      defaultValue={props.currectLang}
      className="p-2 border border-zinc-300 rounded-lg text-sm max-w-24 sm:p-3"
      onChange={(e) => Change(e.target.value)}
    >
      <option value="en">English</option>
      <option value="ru">Русский язык</option>
      <option value="fr">Français</option>
      <option value="tr">Türkçe</option>
      <option value="zh">中文</option>
    </select>
  );
}
