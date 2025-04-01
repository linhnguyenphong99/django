import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-toolify-border bg-white">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Submit AI Tool
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/image" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Image AI
                </Link>
              </li>
              <li>
                <Link href="/category/text" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Text & Writing
                </Link>
              </li>
              <li>
                <Link href="/category/chatbot" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Chatbots
                </Link>
              </li>
              <li>
                <Link href="/category/video" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Video Generation
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-news" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  AI News
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://twitter.com/toolify" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com/company/toolify" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://instagram.com/toolify.ai" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/toolify" className="text-sm text-muted-foreground hover:text-toolify-purple">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-toolify-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Toolify.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/language" className="text-sm text-muted-foreground hover:text-toolify-purple">
              English
            </Link>
            <Link href="/language?lang=zh-CN" className="text-sm text-muted-foreground hover:text-toolify-purple">
              简体中文
            </Link>
            <Link href="/language?lang=zh-TW" className="text-sm text-muted-foreground hover:text-toolify-purple">
              繁體中文
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
