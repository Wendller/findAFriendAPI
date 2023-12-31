export class SavePetError extends Error {
  constructor() {
    super("Pet save failed");
  }
}
