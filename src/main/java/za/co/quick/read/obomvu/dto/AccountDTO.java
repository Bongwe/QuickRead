package za.co.quick.read.obomvu.dto;

import za.co.quick.read.obomvu.model.Account;
import za.co.quick.read.obomvu.model.Settings;

public class AccountDTO {
    private Account account;
    private Settings settings;

    public AccountDTO() {
    }

    public AccountDTO(Account account, Settings settings) {
        this.account = account;
        this.settings = settings;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Settings getSettings() {
        return settings;
    }

    public void setSettings(Settings settings) {
        this.settings = settings;
    }

    @Override
    public String toString() {
        return "AccountDTO{" +
                "account=" + account +
                ", settings=" + settings +
                '}';
    }
}
