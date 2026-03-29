import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // アクセスを拒否したいパスのリスト
  const restrictedPaths = [
    "/wp-admin",
    "/admin",
    "/wp-login",
    "/xmlrpc.php"
  ];

  // パスがいずれかに該当する場合、カスタムの403ページを表示
  if (restrictedPaths.some(p => path.startsWith(p))) {
    // URLはそのままに、403ページの内容を返却（リライト）
    // 第二引数でステータスコードを 403 に指定することは現在の Astro Middleware の標準 API では制限があるため、
    // 単純に /403 にリライトして 200 (内容は403のデザイン) か、
    // あるいは /403 へリダイレクトさせます。
    // 今回はURLを変えたいと思われるため、リダイレクトを使用します。
    return context.redirect("/403", 302);
  }

  return next();
});
