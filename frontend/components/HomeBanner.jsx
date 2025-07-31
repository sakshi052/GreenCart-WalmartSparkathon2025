export default function HomeBanner({ title, subtitle, image, bg, link }) {
  return (
    <div className={`rounded-lg p-4 ${bg} text-white shadow-md flex flex-col justify-between`}>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
      </div>
      <a href={link} className="text-sm underline mt-4 font-semibold">
        Shop now →
      </a>
    </div>
  );
}
