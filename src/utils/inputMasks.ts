export const maskCpf = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
};

export const takeOffMaskCpf = (cpf: string) => {
  return cpf.replaceAll(".", "").replace("-", "");
};
