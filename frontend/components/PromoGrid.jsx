export default function PromoGrid() {
  const promos = [
    { img:'/images/p1.jpg', title:'Deals of the Day', link:'#' },
    { img:'/images/p2.jpg', title:'Back to School', link:'#' },
    { img:'/images/p3.jpg', title:'Summer Skincare', link:'#' },
    { img:'/images/p4.jpg', title:'Fresh Groceries', link:'#' },
  ];
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {promos.map((p,i) => (
        <a key={i} href={p.link} className="relative">
          <img src={p.img} className="w-full h-48 object-cover rounded"/>
          <div className="absolute bottom-2 left-2 text-white text-lg font-bold">{p.title}</div>
        </a>
      ))}
    </div>
  );
}
