Installing Git

* checking the system : 

    - dpkg -l | grep git
        ->the 'ii' in the list means that the package is correctly installed and available

    - apt: this command is used when we want to download package information from all configured sources.

        apt list git -a

        apt-cache pkgnames git

    - git command


* how to install git

    - apt install -y git
    in case if package was installed in the same version, we get notifications about it
    sometimes system will communicate the posibility of purging the obsolete files

    - to check if the installation is succesful: git --version
