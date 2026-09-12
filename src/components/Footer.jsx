export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl mt-space-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-gutter grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-lg text-on-surface-variant">
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline text-on-surface font-bold">About Majestic Hub</h4>
          <a className="text-sm hover:underline" href="#">Our Company</a>
          <a className="text-sm hover:underline" href="#">Store Directory</a>
          <a className="text-sm hover:underline" href="#">Careers</a>
        </div>
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline text-on-surface font-bold">Customer Service</h4>
          <a className="text-sm hover:underline" href="#">Help Center</a>
          <a className="text-sm hover:underline" href="#">Returns</a>
          <a className="text-sm hover:underline" href="#">Product Recalls</a>
        </div>
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline text-on-surface font-bold">Services</h4>
          <a className="text-sm hover:underline" href="#">Majestic Financial Services</a>
          <a className="text-sm hover:underline" href="#">Pharmacy</a>
          <a className="text-sm hover:underline" href="#">Photo Center</a>
        </div>
        <div className="flex flex-col gap-space-sm">
          <h4 className="font-headline text-on-surface font-bold">Stay Connected</h4>
          <p className="text-sm">Get the latest deals and brand drops directly to your inbox.</p>
          <div className="flex gap-space-xs">
            <input
              className="bg-surface px-space-md py-space-xs rounded text-sm flex-1 min-w-0"
              placeholder="Enter email"
              type="email"
            />
            <button className="bg-primary text-on-primary px-space-md py-space-xs rounded text-sm font-medium shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-gutter mt-space-lg pt-space-md border-t border-surface-variant text-center text-sm text-on-surface-variant">
        © 2024 Majestic Hub Stores, Inc. All Rights Reserved.
      </div>
    </footer>
  );
}
