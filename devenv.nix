# devenv.nix
{ pkgs, lib, config, ... }:

{
    languages.javascript = {
        enable = true;
        npm.enable = true;
    };

    packages = [
        pkgs.ngrok
    ];

    pre-commit.hooks = {
        prettier.enable = true;
        eslint.enable = true;
    };
}