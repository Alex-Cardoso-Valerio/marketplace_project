-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CLIENTE', 'VENDEDOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Telefone" TEXT,
    "Cpf" TEXT,
    "Endereco" TEXT,
    "Cnpj" TEXT,
    "ContaBancaria" TEXT,
    "Tipo" "TipoUsuario" NOT NULL DEFAULT 'CLIENTE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "Preco" DOUBLE PRECISION NOT NULL,
    "Foto" TEXT NOT NULL,
    "Categoria" TEXT NOT NULL,
    "VendedorId" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" TEXT NOT NULL,
    "UsuarioId" TEXT NOT NULL,
    "ProdutoId" TEXT NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCarrinho" (
    "id" TEXT NOT NULL,
    "UsuarioId" TEXT NOT NULL,
    "ProdutoId" TEXT NOT NULL,
    "Quantidade" INTEGER NOT NULL,

    CONSTRAINT "ItemCarrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" TEXT NOT NULL,
    "PedidoId" TEXT NOT NULL,
    "ProdutoId" TEXT NOT NULL,
    "Quantidade" INTEGER NOT NULL,
    "PrecoUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemPedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "UsuarioId" TEXT NOT NULL,
    "PagamentoId" TEXT NOT NULL,
    "Total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" TEXT NOT NULL,
    "FormaPagamento" TEXT NOT NULL,
    "IdTransacao" TEXT,
    "ComprovanteUrl" TEXT,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Cpf_key" ON "Usuario"("Cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Cnpj_key" ON "Usuario"("Cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_PagamentoId_key" ON "Pedido"("PagamentoId");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_VendedorId_fkey" FOREIGN KEY ("VendedorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_ProdutoId_fkey" FOREIGN KEY ("ProdutoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCarrinho" ADD CONSTRAINT "ItemCarrinho_ProdutoId_fkey" FOREIGN KEY ("ProdutoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_PedidoId_fkey" FOREIGN KEY ("PedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_ProdutoId_fkey" FOREIGN KEY ("ProdutoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_PagamentoId_fkey" FOREIGN KEY ("PagamentoId") REFERENCES "Pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
