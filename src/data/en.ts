import type { ContentBlock } from './blog';

export const GALLERY_LABELS_EN = {
  prendas: {
    gorras: 'Caps', polos: 'Polo shirts', camisetas: 'T-shirts', camisas: 'Shirts', uniformes: 'Uniforms',
    chompas: 'Jackets', mandiles: 'Aprons', bolsas: 'Fabric bags', toallas: 'Towels', mochilas: 'Backpacks',
  },
  tecnicas: {
    plano: 'Flat embroidery', '3d': '3D / raised embroidery', aplique: 'Appliqué', parche: 'Embroidered patch',
    monograma: 'Monogram', estampado: 'Textile printing', sublimacion: 'Sublimation', confeccion: 'Garment manufacturing',
  },
  sectores: {
    restaurantes: 'Restaurants', salud: 'Healthcare', colegios: 'Schools', hoteleria: 'Hospitality',
    construccion: 'Construction', gimnasios: 'Sports and fitness', eventos: 'Events', particulares: 'Individuals',
  },
} as const;

export const GALLERY_EN: Record<string, { title: string; challenge: string; detail?: string }> = {
  'camiseta-estampada-ilustracion': { title: 'Full-color printed T-shirt', challenge: 'A detailed multicolor illustration needed to retain strong contrast on black cotton. We prepared a light base and controlled color registration for a crisp, consistent finish.', detail: 'Multicolor print · cotton' },
  'bolsas-estampadas-evento': { title: 'Printed fabric bags for an event', challenge: 'The graphic had to remain centered and consistent throughout the run. Pressure and placement were adjusted to keep edges clean on natural canvas texture.', detail: 'One-color print · cotton canvas' },
  'uniforme-futbol-sublimado': { title: 'Full sublimated soccer uniform', challenge: 'The jersey and shorts had to share one continuous design and retain vivid color. Printing was coordinated with the patterns before cutting to align graphics and panels in every size.', detail: 'Full sublimation · performance polyester' },
  'jersey-ciclismo-sublimado': { title: 'Technical jersey with sublimated gradient', challenge: 'The gradient needed to flow across multiple panels without visible jumps. Printing was adapted to the pattern so color bonded with the fiber and stayed continuous through the seams.', detail: 'Full sublimation · technical fabric' },
  'confeccion-camisa-industrial': { title: 'Custom work shirt manufacturing', challenge: 'We developed a durable work shirt with mobility, functional pockets and reinforced seams. The garment was built from the fabric up and left ready for personalization.', detail: 'Patternmaking, cutting and reinforced sewing' },
  'confeccion-uniforme-hosteleria': { title: 'Custom-made hospitality uniform', challenge: 'The shirt and apron were designed as one functional, consistent set. Fabrics, measurements, pockets and topstitching balance a polished look with daily durability.', detail: 'Custom pattern · reinforced finishes' },
  'gorra-construccion-3d': { title: 'Trucker cap with raised logo', challenge: 'The original logo contained strokes that were too fine for the cap front. We strengthened them during digitizing while preserving the proportions, then used 3D embroidery for distance visibility.' },
  'polo-restaurante-mesero': { title: 'Piqué polo for front-of-house staff', challenge: 'A run of 24 polo shirts with the same left-chest logo required identical thread color across two different fabric batches.' },
  'camisa-monograma-iniciales': { title: 'Dress shirt with personal monogram', challenge: 'Tone-on-tone initials were embroidered on the cuff as a subtle one-piece birthday gift, with no minimum quantity.' },
  'chompa-clinica-parche': { title: 'Softshell jacket with embroidered patch', challenge: 'Direct embroidery would have pierced the waterproof membrane. We embroidered the clinic logo separately and stitched the patch onto the garment.' },
  'mandil-cocina-nombre': { title: 'Chef apron with name and logo', challenge: 'Each apron combined the restaurant logo with an individual name. The digitized logo file was reused while every name was prepared separately.' },
  'toalla-hotel-iniciales': { title: 'Hotel hand towel with initials', challenge: 'A water-soluble topping kept the stitches even and visible instead of letting the thread sink into the terry loops.' },
  'mochila-colegio-escudo': { title: 'School backpack with institutional crest', challenge: 'The crest contained small lettering, stripes and a central icon that had to remain legible within the limited embroidery area.' },
  'gorra-evento-carrera': { title: 'Dad cap for a local 5K race', challenge: 'With a fixed event date and tight schedule, an appliqué design delivered clear impact while reducing production time for the full run.' },
  'polo-constructora-corporativa': { title: 'Corporate polo with logo and company name', challenge: 'The reusable digitized file makes recurring uniform orders faster whenever new employees join the company.' },
  'camiseta-gimnasio-3d': { title: 'Performance T-shirt with raised logo', challenge: 'A stabilizer kept the elastic sports fabric from rippling around the raised embroidery during movement.' },
  'chaleco-reflectivo-seguridad': { title: 'Reflective safety vest with patch', challenge: 'The logo was embroidered as a patch to avoid weakening the factory-applied reflective strips.' },
  'bata-doctor-nombre': { title: 'Medical coat with professional name', challenge: 'A single coat received the same careful digitizing and finishing process used for a large institutional order.' },
};

export interface EnglishBlogCopy {
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  body: ContentBlock[];
}

export const BLOG_EN: Record<string, EnglishBlogCopy> = {
  'bordado-vs-estampado': {
    title: 'Embroidery vs. printing: which one fits your project?',
    excerpt: 'There is no universally better technique. Compare durability, cost, fabric compatibility and finish before you choose.',
    metaTitle: 'Embroidery vs. textile printing: how to choose',
    metaDescription: 'A practical comparison of embroidery and textile printing by durability, quantity, fabric, color and budget.',
    imageAlt: 'Fabric samples comparing an embroidered design with a printed design',
    body: [
      { type: 'p', text: 'The right technique depends on the artwork, the fabric and how the garment will be used. Embroidery builds the design with thread; printing places ink or a transfer on the textile surface. Both can look excellent when they match the job.' },
      { type: 'h2', text: 'Durability and daily use', id: 'durability' },
      { type: 'p', text: 'Quality embroidery usually withstands years of frequent washing and is a strong choice for uniforms, caps and executive garments. A well-produced print can also last, but heat, friction and incorrect washing gradually affect its surface.' },
      { type: 'h2', text: 'Artwork, fabric and quantity', id: 'artwork-fabric-quantity' },
      { type: 'ul', items: ['Choose embroidery for a premium textured finish, compact logos and demanding daily use.', 'Choose printing for large artwork, gradients, photographic detail or high-volume runs.', 'Always test lightweight, elastic or waterproof textiles before production.'] },
      { type: 'callout', kind: 'consejo', text: 'Send us the design, garment type, quantity and intended use. Those four details are enough for an honest recommendation.' },
    ],
  },
  'que-archivo-necesito': {
    title: 'Which file should I send for logo embroidery?',
    excerpt: 'A vector file is ideal, but a clear high-resolution image can also work. Learn what helps and what causes problems.',
    metaTitle: 'Best logo file formats for embroidery',
    metaDescription: 'Learn which AI, EPS, PDF, SVG, PNG or JPG file to send for clean embroidery digitizing.',
    imageAlt: 'Laptop displaying a vector logo beside embroidery materials',
    body: [
      { type: 'p', text: 'A clean source file makes digitizing more accurate. Vector artwork such as AI, EPS, PDF or SVG is best because it can be resized without losing edge quality.' },
      { type: 'h2', text: 'If you only have an image', id: 'raster-files' },
      { type: 'p', text: 'A large, sharp PNG or JPG can work. Avoid screenshots, heavily compressed images, angled photos and files where small lettering is already blurry. We can often rebuild imperfect artwork, but it requires additional design time.' },
      { type: 'h2', text: 'The file is not the stitch program', id: 'digitizing' },
      { type: 'p', text: 'Even perfect vector artwork must be converted into stitch instructions. Digitizing defines stitch direction, density, sequence and stabilizer requirements for the actual fabric.' },
      { type: 'callout', kind: 'dato', text: 'Send the original file whenever possible instead of forwarding it through apps that compress images.' },
    ],
  },
  'que-es-el-ponchado': {
    title: 'What is embroidery digitizing and why is it charged separately?',
    excerpt: 'Digitizing turns artwork into a production-ready stitch plan. It is skilled preparation, not an automatic file conversion.',
    metaTitle: 'What embroidery digitizing means',
    metaDescription: 'Understand stitch direction, density, sequence and why embroidery digitizing is a one-time setup cost.',
    imageAlt: 'Embroidery software and machine working from a digitized stitch file',
    body: [
      { type: 'p', text: 'Embroidery machines do not read a normal logo file. A digitizer rebuilds the design as stitches and decides how the thread will travel through every area.' },
      { type: 'h2', text: 'What the digitizer controls', id: 'controls' },
      { type: 'ul', items: ['Stitch type and direction.', 'Density and underlay for the chosen fabric.', 'Color sequence and trims.', 'Compensation for fabric movement and small details.'] },
      { type: 'h2', text: 'A reusable production asset', id: 'reusable' },
      { type: 'p', text: 'Digitizing is normally paid once per design. We keep the approved file for future reorders, which makes recurring uniform production faster and avoids repeating the setup cost.' },
      { type: 'callout', kind: 'advertencia', text: 'A cheap automatic conversion can create gaps, puckering, excessive thread or illegible lettering. The quality of the stitch plan directly affects the garment.' },
    ],
  },
  'de-que-depende-el-precio': {
    title: 'What determines the price of embroidery?',
    excerpt: 'Size alone does not set the price. Stitch count, detail, garment, placement, quantity and setup all matter.',
    metaTitle: 'Embroidery pricing factors explained',
    metaDescription: 'Learn how stitch count, colors, garment type, placement, order volume and digitizing affect embroidery prices.',
    imageAlt: 'Embroidery samples, thread cones and production notes used for a quote',
    body: [
      { type: 'p', text: 'Embroidery pricing reflects machine time, preparation and materials. Two logos with the same dimensions may have very different stitch counts, so quoting by centimeters alone is unreliable.' },
      { type: 'h2', text: 'The main pricing factors', id: 'factors' },
      { type: 'ul', items: ['Stitch count and design density.', 'Number of thread changes and fine details.', 'Garment type and embroidery placement.', 'Order quantity and whether the design is already digitized.', 'Deadline and special handling requirements.'] },
      { type: 'h2', text: 'How to request an accurate quote', id: 'quote' },
      { type: 'p', text: 'Send the artwork, desired size and placement, garment type, number of pieces and delivery date. We review the full job before confirming the price.' },
      { type: 'callout', kind: 'dato', text: 'Ordering more pieces with the same design usually lowers the unit price because setup is distributed across the run.' },
    ],
  },
  'bordado-en-gorras': {
    title: 'Cap embroidery: what to know before ordering',
    excerpt: 'Cap structure, front seams, artwork width and raised embroidery all affect the final result.',
    metaTitle: 'Cap embroidery guide before ordering',
    metaDescription: 'Learn how cap construction, logo size, placement and flat or 3D embroidery affect the finished product.',
    imageAlt: 'Structured caps displaying flat and raised embroidery',
    body: [
      { type: 'p', text: 'Caps are curved, structured objects, so embroidery behaves differently than it does on a flat polo shirt. The crown shape and central seam must be considered during digitizing.' },
      { type: 'h2', text: 'Flat or raised embroidery?', id: 'flat-or-3d' },
      { type: 'p', text: 'Flat embroidery is versatile and works well for detailed logos. Raised embroidery uses foam beneath selected stitches for volume, but it requires thicker shapes and enough spacing between elements.' },
      { type: 'h2', text: 'Choose the cap before finalizing the logo', id: 'choose-cap' },
      { type: 'p', text: 'Trucker, snapback and unstructured caps have different crown heights and support. We adapt the design to the actual model instead of assuming one file will sew identically on every cap.' },
      { type: 'callout', kind: 'consejo', text: 'Small text and thin outlines often need adjustment. Approve a real sewn sample before a large run.' },
    ],
  },
  'cuidar-prenda-bordada': {
    title: 'How to care for embroidered clothing so it lasts',
    excerpt: 'Simple washing, drying and ironing habits protect the thread, shape and color of embroidered garments.',
    metaTitle: 'How to wash and care for embroidered clothing',
    metaDescription: 'Practical instructions for washing, drying and ironing embroidered garments without damaging the stitches.',
    imageAlt: 'Hands carefully preparing an embroidered garment for washing',
    body: [
      { type: 'p', text: 'Well-made embroidery is durable, but friction and excessive heat can age both the thread and the base fabric. A few simple habits keep it looking new.' },
      { type: 'h2', text: 'Wash gently and inside out', id: 'washing' },
      { type: 'ul', items: ['Turn the garment inside out.', 'Use cold or warm water and a mild detergent.', 'Close zippers on other garments and avoid rough items in the same load.', 'Do not use bleach unless the textile care label allows it.'] },
      { type: 'h2', text: 'Dry and iron with care', id: 'drying-ironing' },
      { type: 'p', text: 'Air-dry in the shade when possible. Iron from the reverse side or place a clean cloth between the iron and the embroidery. Never apply high heat directly to raised stitches.' },
      { type: 'callout', kind: 'advertencia', text: 'Never pull a loose thread. Trim it carefully at fabric level so connected stitches do not unravel.' },
    ],
  },
  'guia-ubicaciones-bordado': {
    title: 'Embroidery placement guide: where should your logo go?',
    excerpt: 'Chest, back, sleeve and cap placements communicate differently and each has its own practical size limits.',
    metaTitle: 'Best logo placements for embroidery',
    metaDescription: 'Compare left chest, back, sleeve and cap embroidery placements, visibility and typical size constraints.',
    imageAlt: 'Polo shirt, cap, sleeve and apron with embroidery in different positions',
    body: [
      { type: 'p', text: 'Placement is both a visual and technical decision. Every garment offers a different usable area, and the logo should remain readable without interfering with seams, pockets or movement.' },
      { type: 'h2', text: 'Left chest and front placements', id: 'front' },
      { type: 'p', text: 'The left chest is the most common corporate placement because it is visible without dominating the garment. Center-front works well for casual apparel and larger statements.' },
      { type: 'h2', text: 'Back, sleeves and caps', id: 'other-placements' },
      { type: 'p', text: 'A large back design offers distance visibility. Sleeves suit secondary marks or departments. Caps require artwork adapted to their curved panels and central seams.' },
      { type: 'callout', kind: 'consejo', text: 'Measure placement on the actual garment size range. One fixed distance can look wrong when moving from a small to an extra-large piece.' },
    ],
  },
  'uniformes-para-empresas': {
    title: 'Company uniforms: how to plan the order',
    excerpt: 'A clean size list, approved artwork, realistic deadline and reorder plan prevent the most common uniform mistakes.',
    metaTitle: 'How to plan a company uniform order',
    metaDescription: 'A practical checklist for organizing garment models, sizes, logos, personalization, deadlines and company uniform reorders.',
    imageAlt: 'Organized company uniforms with size and production checklist',
    body: [
      { type: 'p', text: 'Uniform orders combine garment selection, sizing, artwork approval and internal coordination. Organizing those decisions before production protects the schedule and budget.' },
      { type: 'h2', text: 'Build one approved order list', id: 'master-list' },
      { type: 'ul', items: ['Garment model, color and fabric.', 'One row per employee with confirmed size.', 'Exact spelling for names or roles.', 'Logo version, placement and dimensions.', 'Required delivery date and one approval contact.'] },
      { type: 'h2', text: 'Plan for new employees and replacements', id: 'reorders' },
      { type: 'p', text: 'Keep the approved garment reference and size chart. The digitized embroidery file can be reused, making future additions faster and visually consistent.' },
      { type: 'callout', kind: 'dato', text: 'A physical size sample is more reliable than asking employees to guess based on another brand.' },
    ],
  },
  'confeccion-de-uniformes-desde-cero': {
    title: 'Custom uniform manufacturing from scratch: the process',
    excerpt: 'We do more than decorate garments: we develop patterns, cut fabric, sew and finish uniforms to specification.',
    metaTitle: 'How custom uniform manufacturing works',
    metaDescription: 'See the full custom uniform process from fabric and patternmaking through cutting, sewing, personalization and quality control.',
    imageAlt: 'Pattern paper, cut fabric pieces and a finished custom uniform',
    body: [
      { type: 'p', text: 'Manufacturing from scratch gives control over fabric, fit, pockets, trims and construction. It is the right path when a catalog garment cannot meet the project requirements.' },
      { type: 'h2', text: 'From requirement to production sample', id: 'development' },
      { type: 'ul', items: ['Define use, design, fabric and size range.', 'Develop or adapt the pattern.', 'Cut and assemble a sample.', 'Check fit, movement and construction details.', 'Approve personalization before the full run.'] },
      { type: 'h2', text: 'When custom manufacturing makes sense', id: 'when' },
      { type: 'p', text: 'It is especially valuable for distinctive brand uniforms, special functional details, coordinated sets and larger orders where a custom pattern can be reused.' },
      { type: 'callout', kind: 'consejo', text: 'If a catalog garment already solves the need, personalizing it may be faster and more economical. We evaluate both options.' },
    ],
  },
  'confeccion-vs-prenda-personalizada': {
    title: 'Custom-made uniform or personalized ready-made garment?',
    excerpt: 'Compare cost, lead time, fit, exclusivity and minimum quantity to choose the right production route.',
    metaTitle: 'Custom manufacturing vs. ready-made garment personalization',
    metaDescription: 'Compare custom uniform manufacturing and ready-made garment personalization by price, timing, fit and design freedom.',
    imageAlt: 'Comparison between making a shirt and personalizing a finished garment',
    body: [
      { type: 'p', text: 'Both routes can end with a professional branded uniform. The difference is how much control you need before embroidery, printing or sublimation begins.' },
      { type: 'h2', text: 'Personalize a catalog garment', id: 'catalog' },
      { type: 'p', text: 'This is usually faster and more economical for small or medium orders. It works when an existing cut, fabric and color meet the requirement.' },
      { type: 'h2', text: 'Manufacture from scratch', id: 'custom' },
      { type: 'p', text: 'Choose this route for an exclusive cut, exact fabric, special pockets, coordinated pieces or a fit developed around your team. Patternmaking adds time and a setup cost but gives far more control.' },
      { type: 'callout', kind: 'dato', text: 'Tell us the quantity, deadline and non-negotiable features. We will recommend the route that solves the need without unnecessary cost.' },
    ],
  },
  'tipos-de-estampado-textil': {
    title: 'Types of textile printing: which process should you choose?',
    excerpt: 'Screen printing, transfer and heat-transfer vinyl solve different problems. Compare color, feel, quantity and fabric.',
    metaTitle: 'Textile printing methods and when to use each one',
    metaDescription: 'Compare screen printing, transfer and textile vinyl by quantity, color, detail, fabric, durability and budget.',
    imageAlt: 'Textile print samples beside a screen, squeegee and transfer materials',
    body: [
      { type: 'p', text: 'Choosing a print process starts with quantity, artwork, fabric and expected use. Applying the same method to every job can increase cost or produce the wrong finish.' },
      { type: 'h2', text: 'Screen printing for efficient volume', id: 'screen-printing' },
      { type: 'p', text: 'Each color uses a prepared screen, so setup takes time but repeated prints become efficient. It is excellent for medium and large runs with solid colors.' },
      { type: 'h2', text: 'Transfer and textile vinyl', id: 'transfer-vinyl' },
      { type: 'p', text: 'Transfer handles detailed full-color artwork in smaller quantities. Cut vinyl is useful for solid names, numbers and graphics that vary from one garment to another.' },
      { type: 'callout', kind: 'consejo', text: 'Polyester, stretch fabrics and coated textiles require compatibility tests for heat, adhesion and dye migration.' },
    ],
  },
  'cuidar-prenda-estampada': {
    title: 'How to wash printed clothing without cracking the design',
    excerpt: 'Temperature, friction and tumble drying affect print life. This simple routine protects color and adhesion.',
    metaTitle: 'How to wash and care for printed garments',
    metaDescription: 'Practical washing, drying and ironing guidance that helps textile prints retain color and adhesion.',
    imageAlt: 'Hands turning a printed T-shirt inside out before washing',
    body: [
      { type: 'p', text: 'Heat and unnecessary friction accelerate print wear. Most protection happens before the washing machine starts.' },
      { type: 'h2', text: 'Turn it inside out and use cool water', id: 'washing' },
      { type: 'p', text: 'Close zippers on other garments, choose a gentle cycle and use mild detergent. Do not overload the machine or wash the print against rough hardware.' },
      { type: 'h2', text: 'Keep direct heat away', id: 'heat' },
      { type: 'p', text: 'Air-dry in the shade when possible. Iron on the reverse side at the temperature recommended for the fabric, never directly on the printed surface.' },
      { type: 'callout', kind: 'advertencia', text: 'Do not wring the printed area or store the garment while damp.' },
    ],
  },
  'que-es-la-sublimacion': {
    title: 'What is textile sublimation and when should you use it?',
    excerpt: 'Sublimation bonds color inside polyester fibers, leaving no layer on top. Learn its advantages and main limitation.',
    metaTitle: 'Textile sublimation: benefits and limitations',
    metaDescription: 'Learn how dye sublimation works, which fabrics it requires and when it outperforms surface printing.',
    imageAlt: 'Sublimation press, printed transfer and vibrant polyester fabric',
    body: [
      { type: 'p', text: 'Heat turns special dye into gas so it enters polyester fibers. After cooling, the color becomes part of the textile rather than a film sitting on top.' },
      { type: 'h2', text: 'Why it works well for sportswear', id: 'benefits' },
      { type: 'ul', items: ['No heavy print layer or blocked breathability.', 'Full-color gradients and repeated patterns.', 'Names, numbers and sponsors can be integrated into one design.', 'The image does not peel or crack like a surface application.'] },
      { type: 'h2', text: 'The key limitation', id: 'limitation' },
      { type: 'p', text: 'Sublimation performs best on white or light polyester. Natural fibers and dark garments require another method because the dye needs compatible synthetic fibers and cannot print white.' },
      { type: 'callout', kind: 'advertencia', text: 'Heat resistance alone does not make a fabric sublimation-ready. Always confirm its fiber composition.' },
    ],
  },
  'sublimacion-uniformes-deportivos': {
    title: 'Sublimated sports uniforms: planning a complete order',
    excerpt: 'Organize names, numbers, sponsors, sizes and replacement rules before production to prevent avoidable errors.',
    metaTitle: 'How to order sublimated sports uniforms',
    metaDescription: 'Checklist for preparing artwork, sizes, player names, numbers, sponsors and reorders for sublimated team uniforms.',
    imageAlt: 'Fully sublimated sports uniform made from technical fabric',
    body: [
      { type: 'p', text: 'A team uniform combines fit, movement and individual player information. Sublimation integrates the visual system without adding heavy layers, but the order list must be exact before printing.' },
      { type: 'h2', text: 'Prepare one roster', id: 'roster' },
      { type: 'ul', items: ['Player name exactly as it should print.', 'Unique number and confirmed size.', 'Garment pieces required for each person.', 'Approved team colors, crest and sponsor artwork.', 'One person responsible for final approval.'] },
      { type: 'h2', text: 'Approve a sample and keep production files', id: 'sample' },
      { type: 'p', text: 'A sample confirms color, scale, seam alignment and fit. Save the approved pattern and artwork so future replacements match the original team set.' },
      { type: 'callout', kind: 'dato', text: 'Because names and numbers are printed into the fabric, last-minute roster changes may require remaking complete panels.' },
    ],
  },
  'como-elegir-tela-uniformes': {
    title: 'How to choose the right fabric for work uniforms',
    excerpt: 'Climate, movement, washing frequency and job conditions matter more than color or price alone.',
    metaTitle: 'Choosing fabric for work uniforms',
    metaDescription: 'A practical guide to choosing uniform fabric by climate, durability, comfort, washing and personalization method.',
    imageAlt: 'Fabric samples being compared for work uniform manufacturing',
    body: [
      { type: 'p', text: 'The best uniform fabric is the one that supports the real workday. A comfortable office shirt and a construction garment need very different weight, breathability and resistance.' },
      { type: 'h2', text: 'Start with the working conditions', id: 'conditions' },
      { type: 'ul', items: ['Heat, humidity and sun exposure.', 'Required movement and physical effort.', 'Contact with grease, chemicals or abrasive surfaces.', 'How frequently the garment will be washed.', 'Whether it will be embroidered, printed or sublimated.'] },
      { type: 'h2', text: 'Test before committing to volume', id: 'testing' },
      { type: 'p', text: 'Evaluate hand feel, opacity, shrinkage and color after washing. The personalization method must be tested on the same fabric because stretch, coatings and fiber content change the result.' },
      { type: 'callout', kind: 'consejo', text: 'Choose fabric and personalization together. Solving them separately can force an artwork or garment change later.' },
    ],
  },
  'como-tomar-tallas-equipo': {
    title: 'How to collect uniform sizes for a whole team accurately',
    excerpt: 'Use real samples, one master sheet and a single approver to stop sizing mistakes from multiplying in production.',
    metaTitle: 'How to collect sizes for a team uniform order',
    metaDescription: 'A reliable process for gathering, checking and approving uniform sizes for companies, schools and sports teams.',
    imageAlt: 'Team uniform sizing sheet beside measuring tape and sample garments',
    body: [
      { type: 'p', text: 'In a group order, list errors can turn correct production into a difficult delivery. Use the size chart for the exact garment model rather than a generic online reference.' },
      { type: 'h2', text: 'Let people try real samples', id: 'samples' },
      { type: 'p', text: 'Provide a size set and ask each person to test movement over the clothing they normally wear underneath. Separate men’s, women’s and unisex cuts when applicable.' },
      { type: 'h2', text: 'Maintain one controlled master sheet', id: 'master-sheet' },
      { type: 'ul', items: ['One row per person.', 'Exact name or text for personalization.', 'Garment model, size and quantity.', 'Notes only for genuine exceptions.', 'Final approval date and responsible person.'] },
      { type: 'callout', kind: 'advertencia', text: 'Set a change deadline. Adjustments after approval may require new fabric, cutting or printed panels.' },
    ],
  },
};

export const FAQ_CATEGORY_EN: Record<string, string> = {
  'pedidos-y-minimos': 'Orders and minimums',
  'archivos-y-diseno': 'Artwork and design',
  prendas: 'Garments',
  'tiempos-y-entrega': 'Lead times and delivery',
  'precios-y-pagos': 'Pricing and payment',
  'calidad-y-muestras': 'Quality and samples',
};

export const FAQ_EN: Record<string, { question: string; answer: string }> = {
  'pedido-minimo': { question: 'What is the minimum order?', answer: 'There is no minimum quantity: we accept orders from one piece for both companies and individuals. Small orders include artwork, setup and any special material costs. The unit price improves as the number of identical pieces increases; we confirm the exact quote on WhatsApp.' },
  'una-sola-pieza': { question: 'Can I order a single piece?', answer: 'Yes. We serve companies ordering in volume and individuals who need one personalized garment. A single piece has a higher unit price because digitizing and machine setup cannot be distributed across a larger run.' },
  'pedidos-recurrentes': { question: 'Can you handle recurring orders or replacements?', answer: 'Yes. We keep the approved digitized logo for your account, so a reorder with the same design does not pay the digitizing fee again. This is particularly useful when companies add new employees or renew uniforms.' },
  'que-archivo-enviar': { question: 'Which file should I send for my logo?', answer: 'A vector AI, EPS, PDF or SVG file is ideal because it scales without losing clarity. A large, sharp PNG or JPG can also work. Send the original through WhatsApp and we will confirm whether it is production-ready.' },
  'foto-o-captura': { question: 'Can I use a photo or screenshot of the logo?', answer: 'It can serve as a reference, but screenshots and phone photos are often compressed, distorted or too small for production. We can frequently rebuild the logo, although that requires additional design time.' },
  'que-es-el-ponchado': { question: 'What is embroidery digitizing and why is it separate?', answer: 'Digitizing converts artwork into a stitch program and defines stitch type, direction, density, sequence and fine-detail treatment. It is skilled one-time design work, not an automatic conversion, so it is quoted separately from the garment.' },
  'archivo-digitalizado-es-mio': { question: 'Can I receive the digitized embroidery file?', answer: 'We keep it for your future orders so setup is not charged repeatedly. Delivery of the production file is a separate digitizing service; ask for it when requesting your quote.' },
  'degradados-muchos-colores': { question: 'Can you embroider gradients or many colors?', answer: 'Embroidery uses solid thread colors. Gradients can be approximated through stitch shading but will not look identical to a digital gradient. Multiple solid colors are possible; for photographic gradients, textile printing may be the better process.' },
  'bordan-prenda-propia': { question: 'Can you personalize a garment I bring?', answer: 'Yes, after checking its fabric, seams and condition. Some textiles do not tolerate hoop pressure, needles or heat well. Send photos first and we will confirm the safest process.' },
  'prenda-se-dana': { question: 'What happens if my own garment is damaged?', answer: 'We take responsibility for damage caused by our error. Delicate fabrics can also carry an inherent production risk, so for volume jobs we recommend a small spare quantity. We identify and explain that risk before starting.' },
  'tejidos-no-recomendados': { question: 'Which garments or fabrics are difficult to embroider?', answer: 'Very stretchy or loose knits may pucker without special stabilizer. Needles can compromise waterproof membranes, while thick vinyl, leather and rigid synthetics may require another process. We review the material and may recommend printing or a patch instead.' },
  'venden-la-prenda': { question: 'Do you sell or manufacture garments, or only personalize them?', answer: 'We do all three. We manufacture custom garments from fabric, offer a catalog of ready-to-personalize products, and can work on customer-supplied pieces when the material is suitable.' },
  'cuanto-tarda': { question: 'How long does an order take?', answer: 'Lead time depends on quantity, technique and artwork complexity. As a reference, small orders may take about two business days, medium runs around four and large orders up to seven. We confirm the actual date before you approve production.' },
  'entregas-urgentes': { question: 'Do you accept urgent orders?', answer: 'It depends on current production capacity, quantity and technique. Tell us the required date in your first message so we can confirm feasibility and any necessary process adjustment immediately.' },
  'envios-otras-ciudades': { question: 'Do you ship to other cities?', answer: 'Yes. Orders can be collected in Guayaquil or shipped anywhere in Ecuador through the agreed courier or carrier. Shipping is quoted separately according to destination and package size.' },
  'de-que-depende-precio': { question: 'What determines embroidery pricing?', answer: 'Price depends on stitch count, thread changes, garment type, placement, order quantity and whether the logo needs first-time digitizing. Two same-size logos can cost differently when one contains much more detail.' },
  'mas-colores-mas-precio': { question: 'Do more thread colors cost more?', answer: 'Thread color itself does not change the price, but frequent machine stops and color changes increase production time. A one-color logo is normally faster than a six-color design of the same size.' },
  'piden-anticipo': { question: 'Do you require a deposit?', answer: 'Yes. Personalized production starts with a 50% deposit and the balance is paid on delivery. We accept bank transfer, deposit or cash at the workshop, coordinated through WhatsApp.' },
  'ver-muestra-antes': { question: 'Can I see a sample before the full run?', answer: 'Yes. You can request a photo or video of a real production sample before we continue with the remaining pieces. This is the safest way to approve appearance, scale and color.' },
  'no-quedo-como-esperaba': { question: 'What if the result is not what I expected?', answer: 'Once approved artwork is produced correctly, personal-preference changes do not apply. If there is a genuine manufacturing defect or the result differs from the approval, we correct or replace it at no extra cost when reported within 48 hours in unused, unwashed condition.' },
  'se-destine-o-deshilacha': { question: 'Will embroidery fade or unravel in the wash?', answer: 'Quality embroidery lasts for years when washed inside out in cool or warm water and kept away from direct ironing heat. If a loose thread catches, trim it carefully—never pull it.' },
};

const CATALOG_TERMS: [RegExp, string][] = [
  [/CAMISETA/gi, 'T-shirt'], [/POLO/gi, 'Polo shirt'], [/CHOMPA/gi, 'Jacket'], [/GORRA/gi, 'Cap'],
  [/MANDIL/gi, 'Apron'], [/BOLSO/gi, 'Bag'], [/MOCHILA/gi, 'Backpack'], [/TOALLA/gi, 'Towel'],
  [/CAMISA/gi, 'Shirt'], [/CHALECO/gi, 'Vest'], [/OVEROL/gi, 'Coverall'], [/SÁBANAS|SABANAS/gi, 'Bed sheets'],
  [/SERVILLETAS/gi, 'Napkins'], [/COJINES/gi, 'Cushions'], [/MEDIAS/gi, 'Socks'], [/CARTUCHERA/gi, 'Pencil case'],
  [/MORRAL/gi, 'Shoulder bag'], [/RIÑONERA|RINONERA/gi, 'Waist bag'], [/PORTALAPTOP/gi, 'Laptop sleeve'],
  [/MANGA LARGA/gi, 'long sleeve'], [/SIN MANGAS/gi, 'sleeveless'], [/CON CAPUCHA/gi, 'with hood'],
  [/SIN CAPUCHA/gi, 'without hood'], [/CON CIERRE/gi, 'with zipper'], [/REFLECTIVO/gi, 'reflective'],
  [/EJECUTIV[AO]/gi, 'executive'], [/CORPORATIV[AO]/gi, 'corporate'], [/DEPORTIV[AO]/gi, 'sports'],
  [/ESCOLAR/gi, 'school'], [/INDUSTRIAL/gi, 'industrial'], [/DE COCINA/gi, 'kitchen'], [/DE MESERO/gi, 'server'],
  [/DE BARISTA/gi, 'barista'], [/DE MANO/gi, 'hand'], [/DE CUERPO/gi, 'bath'], [/MUJER/gi, 'women’s'],
  [/ALGODÓN|ALGODON/gi, 'cotton'], [/POLIÉSTER|POLIESTER/gi, 'polyester'], [/PIQUÉ|PIQUE/gi, 'piqué'],
  [/GABARDINA/gi, 'gabardine'], [/NEGRO|NEGRA/gi, 'black'], [/ACRÍLICA|ACRILICA/gi, 'acrylic'],
  [/Productos personalizables/gi, 'Customizable products'], [/Ropa corporativa/gi, 'Corporate apparel'],
];

export function catalogTextEn(value: string) {
  return CATALOG_TERMS.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
    .replace(/\s+/g, ' ')
    .trim();
}
