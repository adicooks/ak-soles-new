 /**
  * Product interface defining the structure of a sneaker product
  */
 export interface Product {
   name: string;
   tag: string;
   price: number;
   size: number;
   image: string;
   category: 'nike' | 'jordan' | 'yeezy';
 }

 /**
  * Cart items object mapping product tags to cart items
  */
 export interface CartItems {
   [key: string]: Product;
 }

 /**
  * Responsive breakpoint configuration
  */
 export interface ResponsiveBreakpoint {
   mobile: number;
   tablet: number;
   desktop: number;
 }
